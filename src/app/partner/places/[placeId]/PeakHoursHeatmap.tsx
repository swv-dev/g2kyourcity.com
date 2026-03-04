'use client'

type HourlySlot = {
  day_of_week: number
  hour_of_day: number
  visit_count: number
}

interface Props {
  data: HourlySlot[]
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 24 }, (_, i) => i)

function formatHour(h: number): string {
  if (h === 0) return '12a'
  if (h === 12) return '12p'
  return h < 12 ? `${h}a` : `${h - 12}p`
}

function cellColor(count: number, max: number): string {
  if (max === 0 || count === 0) return 'rgba(30,58,95,0.04)'
  const intensity = count / max
  const alpha = 0.08 + intensity * 0.77
  return `rgba(30,58,95,${alpha.toFixed(2)})`
}

function cellTextColor(count: number, max: number): string {
  if (max === 0 || count === 0) return 'transparent'
  const intensity = count / max
  return intensity > 0.5 ? '#ffffff' : '#1E3A5F'
}

export default function PeakHoursHeatmap({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-gray-400">
        No hourly data available for this period.
      </div>
    )
  }

  const grid: number[][] = Array.from({ length: 7 }, () =>
    new Array(24).fill(0)
  )
  let maxCount = 0

  for (const slot of data) {
    if (
      slot.day_of_week >= 0 &&
      slot.day_of_week < 7 &&
      slot.hour_of_day >= 0 &&
      slot.hour_of_day < 24
    ) {
      grid[slot.day_of_week][slot.hour_of_day] = slot.visit_count
      if (slot.visit_count > maxCount) maxCount = slot.visit_count
    }
  }

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: 560 }}>
        {/* Hour labels */}
        <div className="flex" style={{ paddingLeft: 36 }}>
          {HOURS.map((h) => (
            <div
              key={h}
              className="flex-1 text-center text-gray-400"
              style={{ fontSize: 9, minWidth: 20 }}
            >
              {h % 3 === 0 ? formatHour(h) : ''}
            </div>
          ))}
        </div>

        {/* Rows */}
        {DAYS.map((day, dayIdx) => (
          <div key={day} className="flex items-center" style={{ marginTop: 3 }}>
            <div
              className="text-gray-400"
              style={{
                width: 32,
                fontSize: 11,
                flexShrink: 0,
                textAlign: 'right',
                paddingRight: 6,
              }}
            >
              {day}
            </div>

            {HOURS.map((h) => {
              const count = grid[dayIdx][h]
              return (
                <div
                  key={h}
                  className="flex-1"
                  style={{
                    minWidth: 20,
                    height: 22,
                    background: cellColor(count, maxCount),
                    borderRadius: 3,
                    marginRight: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 8,
                    fontWeight: 600,
                    color: cellTextColor(count, maxCount),
                    transition: 'opacity 0.15s',
                  }}
                  title={
                    count > 0
                      ? `${day} ${formatHour(h)}: ${count} visits`
                      : undefined
                  }
                >
                  {count > 0 && maxCount > 0 && count / maxCount > 0.6
                    ? count
                    : ''}
                </div>
              )
            })}
          </div>
        ))}

        {/* Legend */}
        <div
          className="flex items-center gap-2 mt-4"
          style={{ paddingLeft: 36 }}
        >
          <span className="text-xs text-gray-400">Less</span>
          {[0.05, 0.25, 0.5, 0.75, 1].map((intensity) => (
            <div
              key={intensity}
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                background: `rgba(30,58,95,${(0.08 + intensity * 0.77).toFixed(2)})`,
              }}
            />
          ))}
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>
    </div>
  )
}
