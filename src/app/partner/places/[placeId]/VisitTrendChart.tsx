'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type DailyVisit = {
  visit_date: string
  visit_count: number
  unique_visitors: number
}

interface Props {
  data: DailyVisit[]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="px-3 py-2.5 rounded-lg shadow-lg text-sm bg-navy text-white border-0">
      <p className="font-medium mb-1.5">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ background: entry.color }}
          />
          <span className="text-white/70">{entry.name}:</span>
          <span className="font-semibold">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function VisitTrendChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-gray-400">
        No daily visit data for this period.
      </div>
    )
  }

  const chartData = data.map((d) => ({
    date: formatDate(d.visit_date),
    Visits: d.visit_count,
    'Unique Visitors': d.unique_visitors,
  }))

  const tickInterval = Math.max(1, Math.floor(chartData.length / 8))

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart
        data={chartData}
        margin={{ top: 4, right: 16, left: -8, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e5e7eb"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={{ stroke: '#e5e7eb' }}
          interval={tickInterval}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#9ca3af' }}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          iconType="circle"
          iconSize={8}
        />
        <Line
          type="monotone"
          dataKey="Visits"
          stroke="#1E3A5F"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 0, fill: '#1E3A5F' }}
        />
        <Line
          type="monotone"
          dataKey="Unique Visitors"
          stroke="#FFD700"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 0, fill: '#FFD700' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
