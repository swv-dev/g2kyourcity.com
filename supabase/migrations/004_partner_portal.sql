-- 004_partner_portal.sql
-- Partner portal: tiered access to aggregated analytics for trusted organizations
-- Premium partners see all analytics, basic partners see only their linked places

-- ============================================================================
-- SCHEMA CHANGES
-- ============================================================================

-- Add partner tier to profiles (NULL for non-partner users)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS partner_tier TEXT
    CHECK (partner_tier IN ('premium', 'basic'));

-- Join table: which places belong to which partner
CREATE TABLE IF NOT EXISTS partner_places (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    place_id    TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (partner_id, place_id)
);

CREATE INDEX IF NOT EXISTS idx_partner_places_partner ON partner_places (partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_places_place ON partner_places (place_id);

-- ============================================================================
-- HELPER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION is_partner()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid()
          AND role = 'trusted_org'
    );
$$;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE partner_places ENABLE ROW LEVEL SECURITY;

-- Partners can read their own rows
CREATE POLICY "partner_places_select_own"
    ON partner_places FOR SELECT
    TO authenticated
    USING (partner_id = auth.uid());

-- Admins can manage all rows
CREATE POLICY "partner_places_admin_all"
    ON partner_places FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- ============================================================================
-- PARTNER-SCOPED ANALYTICS RPC
-- ============================================================================

-- Place traffic scoped to caller's linked places (basic partner view)
CREATE OR REPLACE FUNCTION analytics_place_traffic_partner(
    p_start TIMESTAMPTZ,
    p_end TIMESTAMPTZ
)
RETURNS TABLE (
    place_id TEXT,
    business_type TEXT,
    visit_count BIGINT,
    unique_visitors BIGINT,
    avg_dwell_seconds NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Only trusted_org users can call this
    IF NOT is_partner() THEN
        RAISE EXCEPTION 'Access denied: requires trusted_org role';
    END IF;

    RETURN QUERY
    SELECT
        v.place_id,
        v.business_type,
        count(*) AS visit_count,
        count(DISTINCT v.anon_id) AS unique_visitors,
        round(avg(v.dwell_seconds) FILTER (WHERE v.dwell_seconds IS NOT NULL), 1) AS avg_dwell_seconds
    FROM analytics_place_visits v
    INNER JOIN partner_places pp ON pp.place_id = v.place_id
    WHERE pp.partner_id = auth.uid()
      AND v.occurred_at >= p_start
      AND v.occurred_at < p_end
    GROUP BY v.place_id, v.business_type
    HAVING count(DISTINCT v.anon_id) >= 5
    ORDER BY visit_count DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION analytics_place_traffic_partner TO authenticated;
