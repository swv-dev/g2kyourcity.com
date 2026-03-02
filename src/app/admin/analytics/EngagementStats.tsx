'use client'

import { Card, CardContent } from '@/components/ui/card'

interface DauMauRow {
  report_date: string
  daily_active_users: number
  session_count: number
  avg_session_seconds: number | null
  monthly_active_users: number
}

export default function EngagementStats({ data }: { data: DauMauRow[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No engagement data yet</p>
        <p className="text-sm mt-1">Data appears after 5+ unique users have opened the app</p>
      </div>
    )
  }

  const latest = data[0]
  const todayDAU = latest?.daily_active_users ?? 0
  const mau = latest?.monthly_active_users ?? 0
  const totalSessions = data.reduce((sum, d) => sum + d.session_count, 0)
  const avgSessionAll = data.filter((d) => d.avg_session_seconds != null)
  const avgSession =
    avgSessionAll.length > 0
      ? Math.round(avgSessionAll.reduce((sum, d) => sum + (d.avg_session_seconds ?? 0), 0) / avgSessionAll.length)
      : 0

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return sec > 0 ? `${min}m ${sec}s` : `${min}m`
  }

  const stats = [
    { label: 'Today DAU', value: todayDAU.toLocaleString() },
    { label: '30-Day MAU', value: mau.toLocaleString() },
    { label: 'Total Sessions', value: totalSessions.toLocaleString() },
    { label: 'Avg Session', value: formatDuration(avgSession) },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-navy mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* DAU sparkline as simple bar chart */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium text-gray-500 mb-3">Daily Active Users (last {data.length} days)</p>
          <div className="flex items-end gap-1 h-24">
            {[...data].reverse().map((d) => {
              const maxDAU = Math.max(...data.map((r) => r.daily_active_users), 1)
              const height = (d.daily_active_users / maxDAU) * 100
              return (
                <div
                  key={d.report_date}
                  className="flex-1 bg-navy/20 rounded-t hover:bg-navy/40 transition-colors relative group"
                  style={{ height: `${Math.max(height, 4)}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {d.daily_active_users} — {new Date(d.report_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
