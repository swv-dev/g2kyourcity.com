import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import VisitTrendChart from './VisitTrendChart'
import PeakHoursHeatmap from './PeakHoursHeatmap'

export const metadata = {
  title: 'Place Detail | Partner Portal',
}

// ─── Types ─────────────────────────────────────────────────────────────────

type DailyVisit = {
  visit_date: string
  visit_count: number
  unique_visitors: number
}

type HourlySlot = {
  day_of_week: number
  hour_of_day: number
  visit_count: number
}

type AlsoVisited = {
  place_id: string
  place_name: string
  co_visit_count: number
}

type PlaceSummary = {
  place_id: string
  place_name: string
  category: string
  current_period_visits: number
  prior_period_visits: number
  current_unique: number
  prior_unique: number
  avg_dwell_seconds: number | null
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function pctChange(current: number, prior: number): number | null {
  if (!prior) return null
  return Math.round(((current - prior) / prior) * 100)
}

function formatPct(n: number | null): string {
  if (n === null) return 'N/A'
  return `${n >= 0 ? '+' : ''}${n}%`
}

function formatDwell(s: number): string {
  if (!s || s < 60) return `${Math.round(s)}s`
  const m = Math.floor(s / 60)
  const rem = Math.round(s % 60)
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`
}

// ─── Page ──────────────────────────────────────────────────────────────────

interface PageProps {
  params: { placeId: string }
  searchParams: { from?: string; to?: string }
}

export default async function PlaceDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { placeId } = params

  const toDate = searchParams.to ?? new Date().toISOString().split('T')[0]
  const fromDate =
    searchParams.from ??
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

  const supabase = await createClient()

  const [summaryRes, dailyRes, hourlyRes, alsoRes, directoryRes] =
    await Promise.all([
      supabase.rpc('analytics_place_summary', {
        p_place_id: placeId,
        p_date_from: fromDate,
        p_date_to: toDate,
      }),
      supabase.rpc('analytics_place_daily_visits', {
        p_place_id: placeId,
        p_date_from: fromDate,
        p_date_to: toDate,
      }),
      supabase.rpc('analytics_place_peak_hours', {
        p_place_id: placeId,
        p_date_from: fromDate,
        p_date_to: toDate,
      }),
      supabase.rpc('analytics_place_also_visited', {
        p_place_id: placeId,
        p_date_from: fromDate,
        p_date_to: toDate,
        p_limit: 5,
      }),
      supabase
        .from('places_directory')
        .select('place_name, category')
        .eq('place_id', placeId)
        .single(),
    ])

  const summaryRow = summaryRes.data?.[0] ?? null
  const directoryEntry = directoryRes.data

  const summary: PlaceSummary | null =
    summaryRow ??
    (directoryEntry
      ? {
          place_id: placeId,
          place_name: directoryEntry.place_name,
          category: directoryEntry.category ?? 'Place',
          current_period_visits: 0,
          prior_period_visits: 0,
          current_unique: 0,
          prior_unique: 0,
          avg_dwell_seconds: 0,
        }
      : null)

  if (!summary) {
    notFound()
  }

  const dailyVisits: DailyVisit[] = dailyRes.data ?? []
  const hourlySlots: HourlySlot[] = hourlyRes.data ?? []
  const alsoVisited: AlsoVisited[] = alsoRes.data ?? []

  const visitChange = pctChange(
    summary.current_period_visits,
    summary.prior_period_visits
  )
  const uniqueChange = pctChange(summary.current_unique, summary.prior_unique)

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link
          href="/partner/my-places"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 mb-4"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to My Places
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-navy">
              {summary.place_name}
            </h1>
            <Badge
              variant="secondary"
              className="mt-1.5 bg-gold/15 text-navy border-0"
            >
              {summary.category}
            </Badge>
          </div>
        </div>
      </div>

      {/* Month-over-month comparison cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MoMCard label="Visits" current={summary.current_period_visits} pct={visitChange} />
        <MoMCard label="Unique Visitors" current={summary.current_unique} pct={uniqueChange} />
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Avg Dwell Time
            </p>
            <p className="text-3xl font-bold mt-1 text-navy">
              {formatDwell(summary.avg_dwell_seconds ?? 0)}
            </p>
            <p className="text-xs mt-1 text-gray-400">per visit</p>
          </CardContent>
        </Card>
      </div>

      {/* Visit trends chart */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold mb-4 text-navy">
            Visit Trends
          </h2>
          <VisitTrendChart data={dailyVisits} />
        </CardContent>
      </Card>

      {/* Peak hours heatmap */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold mb-1 text-navy">
            Peak Hours
          </h2>
          <p className="text-xs mb-4 text-gray-400">
            Darker cells = more visits during that hour
          </p>
          <PeakHoursHeatmap data={hourlySlots} />
        </CardContent>
      </Card>

      {/* Also visited */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-base font-semibold mb-1 text-navy">
            Also Visited
          </h2>
          <p className="text-xs mb-4 text-gray-400">
            Places your visitors also went to in the same session
          </p>
          {alsoVisited.length === 0 ? (
            <p className="text-sm text-gray-400">
              Not enough co-visit data yet for this period.
            </p>
          ) : (
            <ol className="flex flex-col gap-2">
              {alsoVisited.map((av, idx) => (
                <li
                  key={av.place_id}
                  className="flex items-center gap-3 py-2 border-b last:border-0 border-gray-100"
                >
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      idx === 0
                        ? 'bg-gold text-navy'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium flex-1 text-gray-900">
                    {av.place_name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {av.co_visit_count} co-visits
                  </span>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────

function MoMCard({
  label,
  current,
  pct,
}: {
  label: string
  current: number
  pct: number | null
}) {
  const isPositive = pct !== null && pct >= 0
  const isNeutral = pct === null

  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="text-3xl font-bold mt-1 text-navy">
          {new Intl.NumberFormat('en-US').format(current)}
        </p>
        <p
          className={`text-xs mt-1 font-medium ${
            isNeutral
              ? 'text-gray-400'
              : isPositive
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {formatPct(pct)} vs prior period
        </p>
      </CardContent>
    </Card>
  )
}
