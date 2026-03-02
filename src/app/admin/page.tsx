import { createClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import ActivityFeed from '@/components/admin/ActivityFeed'

export default async function AdminOverview() {
  const supabase = await createClient()

  const [
    pendingEvents,
    pendingPlaces,
    pendingUsers,
    activeSponsorships,
    newContacts,
    newLeads,
    totalLeads,
    activityResult,
    dauMauResult,
  ] = await Promise.all([
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
    supabase
      .from('contact_submissions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new'),
    supabase
      .from('advertiser_leads')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'new'),
    supabase
      .from('advertiser_leads')
      .select('id', { count: 'exact', head: true }),
    supabase.rpc('recent_admin_activity', { lim: 15 }),
    supabase.rpc('analytics_dau_mau', { p_days: 30 }),
  ])

  // Calculate conversion rate
  const convertedLeads = totalLeads.count
    ? await supabase
        .from('advertiser_leads')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'converted')
    : { count: 0 }

  const conversionRate =
    totalLeads.count && totalLeads.count > 0
      ? Math.round(((convertedLeads.count ?? 0) / totalLeads.count) * 100)
      : 0

  // Analytics stats
  const dauData = dauMauResult.data ?? []
  const todayDAU = dauData[0]?.daily_active_users ?? 0
  const mau = dauData[0]?.monthly_active_users ?? 0
  const totalSessions = dauData.reduce((sum, d) => sum + d.session_count, 0)
  const avgSessionAll = dauData.filter((d) => d.avg_session_seconds != null)
  const avgSession =
    avgSessionAll.length > 0
      ? Math.round(avgSessionAll.reduce((sum, d) => sum + (d.avg_session_seconds ?? 0), 0) / avgSessionAll.length)
      : 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          label="Pending Events"
          count={pendingEvents.count ?? 0}
          href="/admin/events"
        />
        <StatCard
          label="Pending Places"
          count={pendingPlaces.count ?? 0}
          href="/admin/places"
        />
        <StatCard
          label="Pending Users"
          count={pendingUsers.count ?? 0}
          href="/admin/users"
        />
        <StatCard
          label="Active Sponsorships"
          count={activeSponsorships.count ?? 0}
          href="/admin/sponsorships"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          label="New Contacts"
          count={newContacts.count ?? 0}
          href="/admin/contacts"
        />
        <StatCard
          label="New Leads"
          count={newLeads.count ?? 0}
          href="/admin/leads"
        />
        <StatCard
          label="Lead Conversion"
          count={conversionRate}
          href="/admin/leads"
          suffix="%"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Today DAU" count={todayDAU} href="/admin/analytics" />
        <StatCard label="30-Day MAU" count={mau} href="/admin/analytics" />
        <StatCard label="Sessions (30d)" count={totalSessions} href="/admin/analytics" />
        <StatCard label="Avg Session" count={avgSession} href="/admin/analytics" suffix="s" />
      </div>

      <h2 className="text-lg font-semibold text-navy mb-3">Recent Activity</h2>
      <ActivityFeed items={activityResult.data ?? []} />
    </div>
  )
}
