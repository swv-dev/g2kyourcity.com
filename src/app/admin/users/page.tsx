import { createClient } from '@/lib/supabase/server'
import UsersTable from './UsersTable'

export default async function UsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'pending')
    .order('applied_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">
        Pending User Applications
      </h1>
      <UsersTable users={users ?? []} />
    </div>
  )
}
