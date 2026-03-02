-- 005_analytics.sql
-- Aggregated location analytics: anonymous event tracking for foot traffic insights
-- Privacy: no GPS coordinates stored, anon_id decoupled from auth, k=5 anonymity threshold

-- ============================================================================
-- RAW EVENT TABLES
-- ============================================================================

-- Geofence entries/exits
CREATE TABLE IF NOT EXISTS analytics_zone_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    anon_id TEXT NOT NULL,
    zone_id TEXT NOT NULL,
    zone_type TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('entry', 'exit')),
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    app_version TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Check-ins and detail views
CREATE TABLE IF NOT EXISTS analytics_place_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    anon_id TEXT NOT NULL,
    place_id TEXT NOT NULL,
    visit_type TEXT NOT NULL CHECK (visit_type IN ('checkin', 'detail_view')),
    dwell_seconds INT,
    business_type TEXT,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    app_version TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- App open/close sessions for DAU/MAU
CREATE TABLE IF NOT EXISTS analytics_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    anon_id TEXT NOT NULL,
    session_start TIMESTAMPTZ NOT NULL DEFAULT now(),
    session_end TIMESTAMPTZ,
    duration_seconds INT,
    app_version TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_zone_events_zone_occurred
    ON analytics_zone_events (zone_id, occurred_at DESC);

CREATE INDEX idx_place_visits_place_occurred
    ON analytics_place_visits (place_id, occurred_at DESC);

CREATE INDEX idx_sessions_anon_start
    ON analytics_sessions (anon_id, session_start);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE analytics_zone_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_place_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Insert: open to anon and authenticated (no PII stored)
CREATE POLICY "analytics_zone_events_insert"
    ON analytics_zone_events FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "analytics_place_visits_insert"
    ON analytics_place_visits FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

CREATE POLICY "analytics_sessions_insert"
    ON analytics_sessions FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Select: admin-only
CREATE POLICY "analytics_zone_events_select"
    ON analytics_zone_events FOR SELECT
    TO authenticated
    USING (is_admin());

CREATE POLICY "analytics_place_visits_select"
    ON analytics_place_visits FOR SELECT
    TO authenticated
    USING (is_admin());

CREATE POLICY "analytics_sessions_select"
    ON analytics_sessions FOR SELECT
    TO authenticated
    USING (is_admin());

-- No UPDATE or DELETE policies — immutable from client

-- ============================================================================
-- AGGREGATION FUNCTIONS (SECURITY DEFINER, k=5 anonymity threshold)
-- ============================================================================

-- 1. Zone traffic: visits per zone per time bucket
CREATE OR REPLACE FUNCTION analytics_zone_traffic(
    p_start TIMESTAMPTZ,
    p_end TIMESTAMPTZ,
    p_grain TEXT DEFAULT 'day' -- 'hour', 'day', 'week'
)
RETURNS TABLE (
    zone_id TEXT,
    zone_type TEXT,
    bucket TIMESTAMPTZ,
    entry_count BIGINT,
    unique_visitors BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.zone_id,
        e.zone_type,
        date_trunc(p_grain, e.occurred_at) AS bucket,
        count(*) FILTER (WHERE e.event_type = 'entry') AS entry_count,
        count(DISTINCT e.anon_id) AS unique_visitors
    FROM analytics_zone_events e
    WHERE e.occurred_at >= p_start
      AND e.occurred_at < p_end
      AND e.event_type = 'entry'
    GROUP BY e.zone_id, e.zone_type, date_trunc(p_grain, e.occurred_at)
    HAVING count(DISTINCT e.anon_id) >= 5
    ORDER BY bucket DESC, entry_count DESC;
END;
$$;

-- 2. Place traffic: visit counts + avg dwell per place
CREATE OR REPLACE FUNCTION analytics_place_traffic(
    p_start TIMESTAMPTZ,
    p_end TIMESTAMPTZ,
    p_type_filter TEXT DEFAULT NULL -- 'checkin', 'detail_view', or NULL for both
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
    RETURN QUERY
    SELECT
        v.place_id,
        v.business_type,
        count(*) AS visit_count,
        count(DISTINCT v.anon_id) AS unique_visitors,
        round(avg(v.dwell_seconds) FILTER (WHERE v.dwell_seconds IS NOT NULL), 1) AS avg_dwell_seconds
    FROM analytics_place_visits v
    WHERE v.occurred_at >= p_start
      AND v.occurred_at < p_end
      AND (p_type_filter IS NULL OR v.visit_type = p_type_filter)
    GROUP BY v.place_id, v.business_type
    HAVING count(DISTINCT v.anon_id) >= 5
    ORDER BY visit_count DESC;
END;
$$;

-- 3. Peak hours: hour-of-day x day-of-week traffic matrix
CREATE OR REPLACE FUNCTION analytics_peak_hours(
    p_zone_filter TEXT DEFAULT NULL,
    p_days INT DEFAULT 30
)
RETURNS TABLE (
    day_of_week INT,   -- 0=Sunday, 6=Saturday
    hour_of_day INT,   -- 0-23
    entry_count BIGINT,
    unique_visitors BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT
        extract(dow FROM e.occurred_at)::int AS day_of_week,
        extract(hour FROM e.occurred_at)::int AS hour_of_day,
        count(*) AS entry_count,
        count(DISTINCT e.anon_id) AS unique_visitors
    FROM analytics_zone_events e
    WHERE e.occurred_at >= now() - (p_days || ' days')::interval
      AND e.event_type = 'entry'
      AND (p_zone_filter IS NULL OR e.zone_id = p_zone_filter)
    GROUP BY extract(dow FROM e.occurred_at)::int, extract(hour FROM e.occurred_at)::int
    HAVING count(DISTINCT e.anon_id) >= 5
    ORDER BY day_of_week, hour_of_day;
END;
$$;

-- 4. DAU/MAU: daily active users, monthly active users, session counts
CREATE OR REPLACE FUNCTION analytics_dau_mau(
    p_days INT DEFAULT 30
)
RETURNS TABLE (
    report_date DATE,
    daily_active_users BIGINT,
    session_count BIGINT,
    avg_session_seconds NUMERIC,
    monthly_active_users BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    WITH daily AS (
        SELECT
            s.session_start::date AS d,
            count(DISTINCT s.anon_id) AS dau,
            count(*) AS sessions,
            round(avg(s.duration_seconds) FILTER (WHERE s.duration_seconds IS NOT NULL), 1) AS avg_dur
        FROM analytics_sessions s
        WHERE s.session_start >= now() - (p_days || ' days')::interval
        GROUP BY s.session_start::date
    ),
    monthly AS (
        SELECT count(DISTINCT s.anon_id) AS mau
        FROM analytics_sessions s
        WHERE s.session_start >= now() - interval '30 days'
    )
    SELECT
        daily.d AS report_date,
        daily.dau AS daily_active_users,
        daily.sessions AS session_count,
        daily.avg_dur AS avg_session_seconds,
        monthly.mau AS monthly_active_users
    FROM daily, monthly
    ORDER BY daily.d DESC;
END;
$$;

-- Grant execute on aggregation functions to authenticated users (admin check is in RPC logic or caller)
GRANT EXECUTE ON FUNCTION analytics_zone_traffic TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_place_traffic TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_peak_hours TO authenticated;
GRANT EXECUTE ON FUNCTION analytics_dau_mau TO authenticated;
