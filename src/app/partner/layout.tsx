import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PartnerSidebar from '@/components/partner/PartnerSidebar'
import PartnerHeader from '@/components/partner/PartnerHeader'

export const metadata = {
  title: 'Partner Portal | G2K Your City\u2122',
}

export default async function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/partner')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, email, org_name, partner_tier')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'trusted_org') {
    redirect('/?error=unauthorized')
  }

  return (
    <div className="flex min-h-screen">
      <PartnerSidebar
        orgName={profile.org_name ?? 'Partner'}
        partnerTier={profile.partner_tier as 'premium' | 'basic'}
      />
      <div className="flex-1 flex flex-col">
        <PartnerHeader
          orgName={profile.org_name ?? 'Partner'}
          email={profile.email}
        />
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
