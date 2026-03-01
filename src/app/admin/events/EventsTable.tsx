'use client'

import { useState } from 'react'
import { moderateEvent } from '../actions'
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
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import type { Database } from '@/types/supabase'

type Event = Database['public']['Tables']['events']['Row']

export default function EventsTable({ events }: { events: Event[] }) {
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  async function handleApprove(id: string) {
    setLoading(id)
    await moderateEvent(id, 'approved')
    setLoading(null)
  }

  async function handleReject() {
    if (!rejectId) return
    setLoading(rejectId)
    await moderateEvent(rejectId, 'rejected', note)
    setRejectId(null)
    setNote('')
    setLoading(null)
  }

  if (events.length === 0) {
    return (
      <p className="text-gray-500 text-center py-12">
        No pending events to review.
      </p>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.location ?? '—'}</TableCell>
              <TableCell>
                {new Date(event.start_date).toLocaleDateString()}
              </TableCell>
              <TableCell>{event.organizer ?? '—'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading === event.id}
                  onClick={() => handleApprove(event.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={loading === event.id}
                  onClick={() => setRejectId(event.id)}
                >
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Event</DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Reason for rejection (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={loading !== null}
            >
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
