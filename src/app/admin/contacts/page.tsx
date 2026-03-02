import { createClient } from '@/lib/supabase/server'
import ContactsTable from './ContactsTable'

export default async function ContactsPage() {
  const supabase = await createClient()

  const { data: contacts } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Contact Submissions</h1>
      <ContactsTable contacts={contacts ?? []} />
    </div>
  )
}
