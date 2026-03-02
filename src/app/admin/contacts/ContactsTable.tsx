'use client'

import { useState } from 'react'
import { updateContactStatus, exportContactsCsv } from '../actions'
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
import type { Database, ContactStatus } from '@/types/supabase'

type Contact = Database['public']['Tables']['contact_submissions']['Row']

const statusColors: Record<ContactStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  read: 'bg-yellow-100 text-yellow-800',
  responded: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-600',
}

const statusOptions: ContactStatus[] = ['new', 'read', 'responded', 'archived']

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const [selected, setSelected] = useState<Contact | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  async function handleStatusChange(id: string, status: ContactStatus) {
    setLoading(id)
    await updateContactStatus(id, status)
    setLoading(null)
    setSelected(null)
  }

  async function handleExport() {
    const result = await exportContactsCsv()
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

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No contact submissions yet.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">{contact.name}</TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>
                  <Badge className={statusColors[contact.status]} variant="secondary">
                    {contact.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(contact.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelected(contact)}
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
                <DialogTitle>{selected.subject}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium">{selected.name}</p>
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
                  <div>
                    <p className="text-gray-500">Status</p>
                    <Badge className={statusColors[selected.status]} variant="secondary">
                      {selected.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500 text-sm mb-1">Message</p>
                  <p className="text-sm bg-gray-50 rounded-lg p-3 whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {statusOptions.map((s) => (
                    <Button
                      key={s}
                      size="sm"
                      variant={selected.status === s ? 'default' : 'outline'}
                      disabled={loading === selected.id || selected.status === s}
                      onClick={() => handleStatusChange(selected.id, s)}
                    >
                      {s}
                    </Button>
                  ))}
                  <a
                    href={`mailto:${selected.email}?subject=${encodeURIComponent(
                      `Re: ${selected.subject}`
                    )}&body=${encodeURIComponent(
                      `Hi ${selected.name},\n\nThanks for reaching out to G2K!\n\n`
                    )}`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                  >
                    Reply via Email
                  </a>
                </div>

                <NotesSection entityType="contact" entityId={selected.id} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
