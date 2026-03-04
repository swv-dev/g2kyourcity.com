import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import PlaceRankingTable from '@/app/admin/analytics/PlaceRankingTable'
import DateRangePicker from './DateRangePicker'

interface PageProps {
  searchParams: { from?: string; to?: string }
}

export default async function PartnerMyPlacesPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/partner/my-places')
  }

  const toDate = searchParams.to ?? new Date().toISOString().split('T')[0]
  const fromDate =
    searchParams.from ??
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0]

  const [trafficResult, placesResult, profileResult] = await Promise.all([
    supabase.rpc('analytics_place_traffic_partner', {
      p_date_from: fromDate,
      p_date_to: toDate,
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">My Places</h1>
        {linkedPlaces.length > 0 && (
          <DateRangePicker from={fromDate} to={toDate} />
        )}
      </div>

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
              <PlaceRankingTable
                data={trafficData}
                linkPrefix="/partner/places"
              />
            </CardContent>
          </Card>
          <p className="text-xs text-gray-400 mt-2">
            Showing data for {fromDate} to {toDate} across {linkedPlaces.length} linked place{linkedPlaces.length !== 1 ? 's' : ''}
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
