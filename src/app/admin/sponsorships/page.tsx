import { createClient } from '@/lib/supabase/server'
import SponsorshipsView from './SponsorshipsView'

export default async function SponsorshipsPage() {
  const supabase = await createClient()

  const [sponsorshipsRes, dealsRes] = await Promise.all([
    supabase
      .from('place_sponsorships')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('place_deals')
      .select('*')
      .order('created_at', { ascending: false }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Sponsorships</h1>
      <SponsorshipsView
        sponsorships={sponsorshipsRes.data ?? []}
        deals={dealsRes.data ?? []}
      />
    </div>
  )
}
