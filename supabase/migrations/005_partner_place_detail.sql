-- 005_partner_place_detail.sql
-- Place detail analytics: daily visits, peak hours, co-visits, month-over-month
-- Also creates places_directory for human-readable place names in partner views

-- ============================================================================
-- PLACES DIRECTORY (lookup table for place metadata)
-- ============================================================================

CREATE TABLE IF NOT EXISTS places_directory (
    place_id    TEXT PRIMARY KEY,
    place_name  TEXT NOT NULL,
    category    TEXT,
    address     TEXT,
    latitude    DOUBLE PRECISION,
    longitude   DOUBLE PRECISION,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_places_directory_category ON places_directory (category);

ALTER TABLE places_directory ENABLE ROW LEVEL SECURITY;

-- Anyone can read the directory
CREATE POLICY "places_directory_select_all"
    ON places_directory FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only admins can modify
CREATE POLICY "places_directory_admin_all"
    ON places_directory FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- ============================================================================
-- UPDATE: analytics_place_traffic_partner (TEXT date params + directory join)
-- ============================================================================

CREATE OR REPLACE FUNCTION analytics_place_traffic_partner(
    p_date_from TEXT,
    p_date_to TEXT
)
RETURNS TABLE (
    place_id TEXT,
    place_name TEXT,
    category TEXT,
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
    IF NOT is_partner() THEN
        RAISE EXCEPTION 'Access denied: requires trusted_org role';
    END IF;

    RETURN QUERY
    SELECT
        v.place_id,
        pd.place_name,
        pd.category,
        v.business_type,
        count(*) AS visit_count,
        count(DISTINCT v.anon_id) AS unique_visitors,
        round(avg(v.dwell_seconds) FILTER (WHERE v.dwell_seconds IS NOT NULL), 1) AS avg_dwell_seconds
    FROM analytics_place_visits v
    INNER JOIN partner_places pp ON pp.place_id = v.place_id
    LEFT JOIN places_directory pd ON pd.place_id = v.place_id
    WHERE pp.partner_id = auth.uid()
      AND v.occurred_at >= p_date_from::date
      AND v.occurred_at < (p_date_to::date + interval '1 day')
    GROUP BY v.place_id, pd.place_name, pd.category, v.business_type
    HAVING count(DISTINCT v.anon_id) >= 5
    ORDER BY visit_count DESC;
END;
$$;

-- ============================================================================
-- NEW: analytics_place_summary (month-over-month for a single place)
-- ============================================================================

CREATE OR REPLACE FUNCTION analytics_place_summary(
    p_place_id TEXT,
    p_date_from TEXT,
    p_date_to TEXT
)
RETURNS TABLE (
    place_id TEXT,
    place_name TEXT,
    category TEXT,
    current_period_visits BIGINT,
    prior_period_visits BIGINT,
    current_unique BIGINT,
    prior_unique BIGINT,
    avg_dwell_seconds NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_from DATE := p_date_from::date;
    v_to   DATE := p_date_to::date;
    v_span INTERVAL := (v_to - v_from) * interval '1 day';
BEGIN
    IF NOT is_partner() THEN
        RAISE EXCEPTION 'Access denied: requires trusted_org role';
    END IF;

    RETURN QUERY
    WITH current_period AS (
        SELECT
            count(*) AS visits,
            count(DISTINCT v.anon_id) AS uniques,
            round(avg(v.dwell_seconds) FILTER (WHERE v.dwell_seconds IS NOT NULL), 1) AS dwell
        FROM analytics_place_visits v
        WHERE v.place_id = p_place_id
          AND v.occurred_at >= v_from
          AND v.occurred_at < v_to + interval '1 day'
    ),
    prior_period AS (
        SELECT
            count(*) AS visits,
            count(DISTINCT v.anon_id) AS uniques
        FROM analytics_place_visits v
        WHERE v.place_id = p_place_id
          AND v.occurred_at >= v_from - v_span
          AND v.occurred_at < v_from
    )
    SELECT
        p_place_id AS place_id,
        COALESCE(pd.place_name, p_place_id) AS place_name,
        COALESCE(pd.category, 'Place') AS category,
        cp.visits AS current_period_visits,
        pp.visits AS prior_period_visits,
        cp.uniques AS current_unique,
        pp.uniques AS prior_unique,
        cp.dwell AS avg_dwell_seconds
    FROM current_period cp, prior_period pp
    LEFT JOIN places_directory pd ON pd.place_id = p_place_id;
END;
$$;

-- ============================================================================
-- NEW: analytics_place_daily_visits (daily breakdown for charts)
-- ============================================================================

CREATE OR REPLACE FUNCTION analytics_place_daily_visits(
    p_place_id TEXT,
    p_date_from TEXT,
    p_date_to TEXT
)
RETURNS TABLE (
    visit_date DATE,
    visit_count BIGINT,
    unique_visitors BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT is_partner() THEN
        RAISE EXCEPTION 'Access denied: requires trusted_org role';
    END IF;

    RETURN QUERY
    SELECT
        v.occurred_at::date AS visit_date,
        count(*) AS visit_count,
        count(DISTINCT v.anon_id) AS unique_visitors
    FROM analytics_place_visits v
    WHERE v.place_id = p_place_id
      AND v.occurred_at >= p_date_from::date
      AND v.occurred_at < (p_date_to::date + interval '1 day')
    GROUP BY v.occurred_at::date
    ORDER BY visit_date;
END;
$$;

-- ============================================================================
-- NEW: analytics_place_peak_hours (hourly heatmap for a single place)
-- ============================================================================

CREATE OR REPLACE FUNCTION analytics_place_peak_hours(
    p_place_id TEXT,
    p_date_from TEXT,
    p_date_to TEXT
)
RETURNS TABLE (
    day_of_week INT,
    hour_of_day INT,
    visit_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT is_partner() THEN
        RAISE EXCEPTION 'Access denied: requires trusted_org role';
    END IF;

    RETURN QUERY
    SELECT
        extract(dow FROM v.occurred_at)::int AS day_of_week,
        extract(hour FROM v.occurred_at)::int AS hour_of_day,
        count(*) AS visit_count
    FROM analytics_place_visits v
    WHERE v.place_id = p_place_id
      AND v.occurred_at >= p_date_from::date
      AND v.occurred_at < (p_date_to::date + interval '1 day')
    GROUP BY extract(dow FROM v.occurred_at)::int, extract(hour FROM v.occurred_at)::int
    ORDER BY day_of_week, hour_of_day;
END;
$$;

-- ============================================================================
-- NEW: analytics_place_also_visited (co-visit ranking)
-- ============================================================================

CREATE OR REPLACE FUNCTION analytics_place_also_visited(
    p_place_id TEXT,
    p_date_from TEXT,
    p_date_to TEXT,
    p_limit INT DEFAULT 5
)
RETURNS TABLE (
    place_id TEXT,
    place_name TEXT,
    co_visit_count BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF NOT is_partner() THEN
        RAISE EXCEPTION 'Access denied: requires trusted_org role';
    END IF;

    -- Find other places visited by the same anon_ids on the same day
    RETURN QUERY
    WITH target_visitors AS (
        SELECT DISTINCT v.anon_id, v.occurred_at::date AS visit_day
        FROM analytics_place_visits v
        WHERE v.place_id = p_place_id
          AND v.occurred_at >= p_date_from::date
          AND v.occurred_at < (p_date_to::date + interval '1 day')
    )
    SELECT
        other.place_id,
        COALESCE(pd.place_name, other.place_id) AS place_name,
        count(DISTINCT tv.anon_id) AS co_visit_count
    FROM target_visitors tv
    INNER JOIN analytics_place_visits other
        ON other.anon_id = tv.anon_id
        AND other.occurred_at::date = tv.visit_day
        AND other.place_id != p_place_id
    LEFT JOIN places_directory pd ON pd.place_id = other.place_id
    GROUP BY other.place_id, pd.place_name
    HAVING count(DISTINCT tv.anon_id) >= 2
    ORDER BY co_visit_count DESC
    LIMIT p_limit;
END;
$$;

-- ============================================================================
-- GRANTS
-- ============================================================================

GRANT EXECUTE ON FUNCTION analytics_place_traffic_partner(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_place_summary TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_place_daily_visits TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_place_peak_hours TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_place_also_visited TO authenticated;
