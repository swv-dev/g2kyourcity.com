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

interface ZoneTrafficRow {
  zone_id: string
  zone_type: string
  bucket: string
  entry_count: number
  unique_visitors: number
}

const zoneTypeColors: Record<string, string> = {
  highwayExit: 'bg-blue-100 text-blue-800',
  interchange: 'bg-purple-100 text-purple-800',
  downtown: 'bg-green-100 text-green-800',
  attraction: 'bg-yellow-100 text-yellow-800',
  business: 'bg-orange-100 text-orange-800',
}

export default function ZoneTrafficTable({ data }: { data: ZoneTrafficRow[] }) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg font-medium">No zone traffic data yet</p>
        <p className="text-sm mt-1">Data appears after 5+ unique visitors enter a zone</p>
      </div>
    )
  }

  const maxEntries = Math.max(...data.map((d) => d.entry_count), 1)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zone</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Period</TableHead>
          <TableHead className="text-right">Entries</TableHead>
          <TableHead className="text-right">Unique Visitors</TableHead>
          <TableHead className="w-48">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={`${row.zone_id}-${row.bucket}-${i}`}>
            <TableCell className="font-medium">{row.zone_id}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={zoneTypeColors[row.zone_type] ?? 'bg-gray-100 text-gray-800'}
              >
                {row.zone_type}
              </Badge>
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              {new Date(row.bucket).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </TableCell>
            <TableCell className="text-right font-mono">{row.entry_count}</TableCell>
            <TableCell className="text-right font-mono">{row.unique_visitors}</TableCell>
            <TableCell>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-navy h-2 rounded-full transition-all"
                  style={{ width: `${(row.entry_count / maxEntries) * 100}%` }}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
