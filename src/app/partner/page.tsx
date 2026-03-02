import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function PartnerIndexPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/partner')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('partner_tier')
    .eq('id', user.id)
    .single()

  if (profile?.partner_tier === 'premium') {
    redirect('/partner/analytics')
  }

  redirect('/partner/my-places')
}
