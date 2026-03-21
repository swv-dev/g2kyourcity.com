'use client'

import { useState } from 'react'
import { updateLeadStatus, exportLeadsCsv } from '../actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import NotesSection from '@/components/admin/NotesSection'
import type { Database, LeadStatus } from '@/types/supabase'

type Lead = Database['public']['Tables']['advertiser_leads']['Row']

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  negotiating: 'bg-purple-100 text-purple-800',
  converted: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
}

const statusOptions: LeadStatus[] = ['new', 'contacted', 'negotiating', 'converted', 'lost']

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [selected, setSelected] = useState<Lead | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  async function handleStatusChange(id: string, status: LeadStatus) {
    setLoading(id)
    await updateLeadStatus(id, status)
    setLoading(null)
    setSelected(null)
  }

  async function handleExport() {
    const result = await exportLeadsCsv()
    if (result.error || !result.csv) return
    const blob = new Blob([result.csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename!
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No advertiser leads yet.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.business_name}</TableCell>
                <TableCell>{lead.contact_name}</TableCell>
                <TableCell>
                  {lead.tier_interest ? (
                    <Badge variant="secondary" className="capitalize">
                      {lead.tier_interest}
                    </Badge>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status]} variant="secondary">
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelected(lead)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.business_name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Contact</p>
                    <p className="font-medium">{selected.contact_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{selected.email}</p>
                  </div>
                  {selected.phone && (
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium">{selected.phone}</p>
                    </div>
                  )}
                  {selected.website && (
                    <div>
                      <p className="text-gray-500">Website</p>
                      <a
                        href={selected.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {selected.website}
                      </a>
                    </div>
                  )}
                  <div>
                    <p className="text-gray-500">Tier Interest</p>
                    <p className="font-medium capitalize">
                      {selected.tier_interest ?? 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Source</p>
                    <p className="font-medium capitalize">{selected.source}</p>
                  </div>
                </div>

                {selected.message && (
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Message</p>
                    <p className="text-sm bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-gray-500 text-sm mb-2">Pipeline</p>
                  <div className="flex gap-2 flex-wrap">
                    {statusOptions.map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant={selected.status === s ? 'default' : 'outline'}
                        disabled={loading === selected.id || selected.status === s}
                        onClick={() => handleStatusChange(selected.id, s)}
                        className={
                          selected.status === s && s === 'lost'
                            ? 'bg-red-600 hover:bg-red-700'
                            : selected.status === s && s === 'converted'
                              ? 'bg-green-600 hover:bg-green-700'
                              : ''
                        }
                      >
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    `G2K Sponsorship — ${selected.business_name}`
                  )}&body=${encodeURIComponent(
                    `Hi ${selected.contact_name},\n\nThanks for your interest in advertising on G2K Henderson\u2122!\n\n`
                  )}`}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                >
                  Email Lead
                </a>

                <NotesSection entityType="lead" entityId={selected.id} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
