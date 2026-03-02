import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import ZoneTrafficTable from './ZoneTrafficTable'
import PlaceRankingTable from './PlaceRankingTable'
import PeakHoursGrid from './PeakHoursGrid'
import EngagementStats from './EngagementStats'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const now = new Date().toISOString()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [zoneTraffic, placeTraffic, peakHours, dauMau] = await Promise.all([
    supabase.rpc('analytics_zone_traffic', {
      p_start: thirtyDaysAgo,
      p_end: now,
      p_grain: 'day',
    }),
    supabase.rpc('analytics_place_traffic', {
      p_start: thirtyDaysAgo,
      p_end: now,
    }),
    supabase.rpc('analytics_peak_hours', { p_days: 30 }),
    supabase.rpc('analytics_dau_mau', { p_days: 30 }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Analytics</h1>

      {/* Engagement Overview */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-navy mb-3">Engagement</h2>
        <EngagementStats data={dauMau.data ?? []} />
      </section>

      {/* Peak Hours Heatmap */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-navy mb-3">Peak Hours (last 30 days)</h2>
        <PeakHoursGrid data={peakHours.data ?? []} />
      </section>

      {/* Zone Traffic */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-navy mb-3">Zone Traffic (last 30 days)</h2>
        <Card>
          <CardContent className="p-0">
            <ZoneTrafficTable data={zoneTraffic.data ?? []} />
          </CardContent>
        </Card>
      </section>

      {/* Place Rankings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-navy mb-3">Top Places (last 30 days)</h2>
        <Card>
          <CardContent className="p-0">
            <PlaceRankingTable data={placeTraffic.data ?? []} />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
