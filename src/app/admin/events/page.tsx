import { createClient } from '@/lib/supabase/server'
import EventsTable from './EventsTable'

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('moderation_status', 'pending_review')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Pending Events</h1>
      <EventsTable events={events ?? []} />
    </div>
  )
}
