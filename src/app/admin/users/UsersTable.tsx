'use client'

import { useState } from 'react'
import { approveUser, rejectUser } from '../actions'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Database, UserRole } from '@/types/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']

export default function UsersTable({ users }: { users: Profile[] }) {
  const [roles, setRoles] = useState<Record<string, UserRole>>({})
  const [loading, setLoading] = useState<string | null>(null)

  async function handleApprove(id: string) {
    const role = roles[id] || 'explorer'
    setLoading(id)
    await approveUser(id, role)
    setLoading(null)
  }

  async function handleReject(id: string) {
    setLoading(id)
    await rejectUser(id)
    setLoading(null)
  }

  if (users.length === 0) {
    return (
      <p className="text-gray-500 text-center py-12">
        No pending user applications.
      </p>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Organization</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              {user.display_name ?? '—'}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.org_name ?? '—'}</TableCell>
            <TableCell>
              {user.applied_at
                ? new Date(user.applied_at).toLocaleDateString()
                : '—'}
            </TableCell>
            <TableCell>
              <Select
                value={roles[user.id] || 'explorer'}
                onValueChange={(v) =>
                  setRoles((prev) => ({ ...prev, [user.id]: v as UserRole }))
                }
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="explorer">Explorer</SelectItem>
                  <SelectItem value="trusted_org">Trusted Org</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700"
                disabled={loading === user.id}
                onClick={() => handleApprove(user.id)}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                disabled={loading === user.id}
                onClick={() => handleReject(user.id)}
              >
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
