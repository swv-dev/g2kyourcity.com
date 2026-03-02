'use client'

import { Card, CardContent } from '@/components/ui/card'

interface PeakHoursRow {
  day_of_week: number
  hour_of_day: number
  entry_count: number
  unique_visitors: number
}

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatHour(h: number): string {
  if (h === 0) return '12a'
  if (h < 12) return `${h}a`
  if (h === 12) return '12p'
  return `${h - 12}p`
}

export default function PeakHoursGrid({ data }: { data: PeakHoursRow[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No peak hours data yet</p>
        <p className="text-sm mt-1">Data appears after 5+ unique visitors per time slot</p>
      </div>
    )
  }

  // Build lookup map
  const lookup = new Map<string, PeakHoursRow>()
  for (const row of data) {
    lookup.set(`${row.day_of_week}-${row.hour_of_day}`, row)
  }

  const maxCount = Math.max(...data.map((d) => d.entry_count), 1)

  // Only show hours 6am-11pm for readability
  const hours = Array.from({ length: 18 }, (_, i) => i + 6)

  const getIntensity = (count: number) => {
    const ratio = count / maxCount
    if (ratio === 0) return 'bg-gray-50'
    if (ratio < 0.2) return 'bg-navy/10'
    if (ratio < 0.4) return 'bg-navy/20'
    if (ratio < 0.6) return 'bg-navy/40'
    if (ratio < 0.8) return 'bg-navy/60'
    return 'bg-navy/80'
  }

  const getTextColor = (count: number) => {
    const ratio = count / maxCount
    return ratio >= 0.6 ? 'text-white' : 'text-gray-600'
  }

  return (
    <Card>
      <CardContent className="p-4 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="grid gap-px" style={{ gridTemplateColumns: `48px repeat(${hours.length}, 1fr)` }}>
            <div />
            {hours.map((h) => (
              <div key={h} className="text-xs text-gray-400 text-center pb-1">
                {formatHour(h)}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {dayLabels.map((day, dayIdx) => (
            <div
              key={day}
              className="grid gap-px"
              style={{ gridTemplateColumns: `48px repeat(${hours.length}, 1fr)` }}
            >
              <div className="text-xs font-medium text-gray-500 flex items-center pr-2 justify-end">
                {day}
              </div>
              {hours.map((h) => {
                const cell = lookup.get(`${dayIdx}-${h}`)
                const count = cell?.entry_count ?? 0
                return (
                  <div
                    key={h}
                    className={`aspect-square rounded-sm ${getIntensity(count)} flex items-center justify-center relative group cursor-default transition-colors`}
                  >
                    {count > 0 && (
                      <span className={`text-[10px] font-mono ${getTextColor(count)}`}>
                        {count}
                      </span>
                    )}
                    {count > 0 && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-navy text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {count} entries, {cell?.unique_visitors} unique
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-xs text-gray-400">Less</span>
            {['bg-gray-50', 'bg-navy/10', 'bg-navy/20', 'bg-navy/40', 'bg-navy/60', 'bg-navy/80'].map((cls) => (
              <div key={cls} className={`w-3 h-3 rounded-sm ${cls}`} />
            ))}
            <span className="text-xs text-gray-400">More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
