import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/login/actions'

export default async function PartnerAccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/partner/account')
  }

  const [profileResult, placesResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('org_name, email, partner_tier, role')
      .eq('id', user.id)
      .single(),
    supabase
      .from('partner_places')
      .select('place_id')
      .eq('partner_id', user.id),
  ])

  const profile = profileResult.data
  const linkedPlaces = placesResult.data ?? []

  if (!profile || profile.role !== 'trusted_org') {
    redirect('/?error=unauthorized')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Account</h1>

      <Card className="max-w-lg">
        <CardContent className="p-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Organization</p>
            <p className="text-lg font-semibold text-navy">{profile.org_name ?? '—'}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm text-gray-900">{profile.email}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Partner Tier</p>
            <Badge
              className={`mt-1 ${
                profile.partner_tier === 'premium'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                  : 'bg-blue-100 text-blue-800 border-blue-300'
              }`}
              variant="outline"
            >
              {profile.partner_tier === 'premium' ? 'Premium' : 'Basic'}
            </Badge>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Linked Places</p>
            {linkedPlaces.length === 0 ? (
              <p className="text-sm text-gray-400 mt-1">No places linked</p>
            ) : (
              <ul className="mt-1 space-y-1">
                {linkedPlaces.map((p) => (
                  <li key={p.place_id} className="text-sm text-gray-900 font-mono">
                    {p.place_id}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-400 mb-4">
              Contact your G2K administrator to update your account details or linked places.
            </p>
            <form action={signOut}>
              <Button variant="outline" size="sm" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
