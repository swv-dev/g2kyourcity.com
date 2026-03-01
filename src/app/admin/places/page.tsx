import { createClient } from '@/lib/supabase/server'
import PlacesTable from './PlacesTable'

export default async function PlacesPage() {
  const supabase = await createClient()

  const { data: places } = await supabase
    .from('place_submissions')
    .select('*')
    .eq('moderation_status', 'pending_review')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">
        Pending Place Submissions
      </h1>
      <PlacesTable places={places ?? []} />
    </div>
  )
}
