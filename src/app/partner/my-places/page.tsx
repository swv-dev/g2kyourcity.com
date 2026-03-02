import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import PlaceRankingTable from '@/app/admin/analytics/PlaceRankingTable'

export default async function PartnerMyPlacesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/partner/my-places')
  }

  const now = new Date().toISOString()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [trafficResult, placesResult, profileResult] = await Promise.all([
    supabase.rpc('analytics_place_traffic_partner', {
      p_start: thirtyDaysAgo,
      p_end: now,
    }),
    supabase
      .from('partner_places')
      .select('place_id')
      .eq('partner_id', user.id),
    supabase
      .from('profiles')
      .select('partner_tier')
      .eq('id', user.id)
      .single(),
  ])

  const trafficData = trafficResult.data ?? []
  const linkedPlaces = placesResult.data ?? []
  const partnerTier = profileResult.data?.partner_tier

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">My Places</h1>

      {linkedPlaces.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium text-gray-700">No places linked yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Contact your G2K administrator to link your business locations to your account.
            </p>
          </CardContent>
        </Card>
      ) : trafficData.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium text-gray-700">No traffic data available yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Traffic data appears once at least 5 unique visitors have interacted with your
              location(s). This threshold protects individual user privacy.
            </p>
            <p className="text-xs text-gray-400 mt-4">
              {linkedPlaces.length} place{linkedPlaces.length !== 1 ? 's' : ''} linked to your account
            </p>
          </CardContent>
        </Card>
      ) : (
        <section className="mb-8">
          <Card>
            <CardContent className="p-0">
              <PlaceRankingTable data={trafficData} />
            </CardContent>
          </Card>
          <p className="text-xs text-gray-400 mt-2">
            Showing data for the last 30 days across {linkedPlaces.length} linked place{linkedPlaces.length !== 1 ? 's' : ''}
          </p>
        </section>
      )}

      {partnerTier === 'basic' && (
        <Card className="mt-6 border-gold/30 bg-gold/5">
          <CardContent className="py-6 text-center">
            <p className="text-lg font-semibold text-navy">Upgrade to Premium</p>
            <p className="text-sm text-gray-600 mt-2">
              Premium partners get access to city-wide analytics including zone traffic,
              peak hours, and engagement metrics across all locations.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Contact your G2K administrator to upgrade.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
