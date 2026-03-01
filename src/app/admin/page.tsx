import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'

export default async function AdminOverview() {
  const supabase = await createClient()

  const [events, places, users, sponsorships] = await Promise.all([
    supabase
      .from('events')
      .select('id', { count: 'exact', head: true })
      .eq('moderation_status', 'pending_review'),
    supabase
      .from('place_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('moderation_status', 'pending_review'),
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'pending'),
    supabase
      .from('place_sponsorships')
      .select('id', { count: 'exact', head: true })
      .eq('is_active', true),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Pending Events"
          count={events.count ?? 0}
          href="/admin/events"
        />
        <StatCard
          label="Pending Places"
          count={places.count ?? 0}
          href="/admin/places"
        />
        <StatCard
          label="Pending Users"
          count={users.count ?? 0}
          href="/admin/users"
        />
        <StatCard
          label="Active Sponsorships"
          count={sponsorships.count ?? 0}
          href="/admin/sponsorships"
        />
      </div>
    </div>
  )
}
