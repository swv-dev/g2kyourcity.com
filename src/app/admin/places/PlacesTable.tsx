'use client'

import { useState } from 'react'
import { moderatePlace } from '../actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import type { Database } from '@/types/supabase'

type Place = Database['public']['Tables']['place_submissions']['Row']

export default function PlacesTable({ places }: { places: Place[] }) {
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  async function handleApprove(id: string) {
    setLoading(id)
    await moderatePlace(id, 'approved')
    setLoading(null)
  }

  async function handleReject() {
    if (!rejectId) return
    setLoading(rejectId)
    await moderatePlace(rejectId, 'rejected', note)
    setRejectId(null)
    setNote('')
    setLoading(null)
  }

  if (places.length === 0) {
    return (
      <p className="text-gray-500 text-center py-12">
        No pending place submissions to review.
      </p>
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {places.map((place) => (
            <TableRow key={place.id}>
              <TableCell className="font-medium">{place.name}</TableCell>
              <TableCell>{place.address ?? '—'}</TableCell>
              <TableCell>{place.business_type ?? '—'}</TableCell>
              <TableCell>{place.phone ?? '—'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  disabled={loading === place.id}
                  onClick={() => handleApprove(place.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={loading === place.id}
                  onClick={() => setRejectId(place.id)}
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
            <DialogTitle>Reject Place Submission</DialogTitle>
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
