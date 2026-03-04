'use client'

import { useRouter } from 'next/navigation'
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
  place_name?: string | null
  category?: string | null
  business_type: string | null
  visit_count: number
  unique_visitors: number
  avg_dwell_seconds: number | null
}

interface PlaceRankingTableProps {
  data: PlaceTrafficRow[]
  /** When set, rows become clickable links to `${linkPrefix}/${place_id}` */
  linkPrefix?: string
}

export default function PlaceRankingTable({ data, linkPrefix }: PlaceRankingTableProps) {
  const router = useRouter()

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

  const hasNames = data.some((r) => r.place_name)
  const hasCategories = data.some((r) => r.category)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8">#</TableHead>
          <TableHead>{hasNames ? 'Place' : 'Place ID'}</TableHead>
          <TableHead>{hasCategories ? 'Category' : 'Type'}</TableHead>
          <TableHead className="text-right">Visits</TableHead>
          <TableHead className="text-right">Unique</TableHead>
          <TableHead className="text-right">Avg Dwell</TableHead>
          <TableHead className="w-48">Volume</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => {
          const nameDisplay = row.place_name || row.place_id
          const typeDisplay = row.category || row.business_type

          return (
            <TableRow
              key={row.place_id}
              className={linkPrefix ? 'cursor-pointer' : undefined}
              onClick={
                linkPrefix
                  ? () => router.push(`${linkPrefix}/${row.place_id}`)
                  : undefined
              }
            >
              <TableCell className="font-mono text-gray-400">{i + 1}</TableCell>
              <TableCell className="font-medium text-sm">
                {nameDisplay}
                {linkPrefix && (
                  <svg
                    className="inline-block ml-1.5 text-gray-300"
                    width="12"
                    height="12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </TableCell>
              <TableCell>
                {typeDisplay ? (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                    {typeDisplay}
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
          )
        })}
      </TableBody>
    </Table>
  )
}
