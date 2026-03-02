import { createClient } from '@/lib/supabase/server'
import LeadsTable from './LeadsTable'

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('advertiser_leads')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Advertiser Leads</h1>
      <LeadsTable leads={leads ?? []} />
    </div>
  )
}
