'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface PlaceTrafficRow {
  place_id: string
  business_type: string | null
  visit_count: number
  unique_visitors: number
  avg_dwell_seconds: number | null
}

export default function PlaceRankingTable({ data }: { data: PlaceTrafficRow[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No place visit data yet</p>
        <p className="text-sm mt-1">Data appears after 5+ unique visitors interact with a place</p>
      </div>
    )
  }

  const formatDwell = (seconds: number | null) => {
    if (seconds == null) return '—'
    if (seconds < 60) return `${Math.round(seconds)}s`
    const min = Math.floor(seconds / 60)
    const sec = Math.round(seconds % 60)
    return sec > 0 ? `${min}m ${sec}s` : `${min}m`
  }

  const maxVisits = Math.max(...data.map((d) => d.visit_count), 1)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">#</TableHead>
          <TableHead>Place ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Visits</TableHead>
          <TableHead className="text-right">Unique</TableHead>
          <TableHead className="text-right">Avg Dwell</TableHead>
          <TableHead className="w-48">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={row.place_id}>
            <TableCell className="font-mono text-gray-400">{i + 1}</TableCell>
            <TableCell className="font-medium text-sm">{row.place_id}</TableCell>
            <TableCell>
              {row.business_type ? (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                  {row.business_type}
                </Badge>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </TableCell>
            <TableCell className="text-right font-mono">{row.visit_count}</TableCell>
            <TableCell className="text-right font-mono">{row.unique_visitors}</TableCell>
            <TableCell className="text-right font-mono">{formatDwell(row.avg_dwell_seconds)}</TableCell>
            <TableCell>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-gold h-2 rounded-full transition-all"
                  style={{ width: `${(row.visit_count / maxVisits) * 100}%` }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
