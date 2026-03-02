'use client'

import { useState, useEffect } from 'react'
import { addNote, fetchNotes } from '@/app/admin/actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { NoteEntityType } from '@/types/supabase'

interface NotesSectionProps {
  entityType: NoteEntityType
  entityId: string
}

interface Note {
  id: string
  note: string
  created_at: string
  admin_id: string
}

export default function NotesSection({ entityType, entityId }: NotesSectionProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchNotes(entityType, entityId).then((result) => {
      if (result.notes) setNotes(result.notes)
    })
  }, [entityType, entityId])

  async function handleAdd() {
    if (!newNote.trim()) return
    setLoading(true)
    const result = await addNote(entityType, entityId, newNote.trim())
    if (!result?.error) {
      setNewNote('')
      const refreshed = await fetchNotes(entityType, entityId)
      if (refreshed.notes) setNotes(refreshed.notes)
    }
    setLoading(false)
  }

  return (
    <div className="mt-6 border-t pt-4">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Notes</h4>

      {notes.length > 0 && (
        <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
          {notes.map((n) => (
            <div key={n.id} className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-800">{n.note}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows={2}
          className="text-sm"
        />
        <Button
          size="sm"
          onClick={handleAdd}
          disabled={loading || !newNote.trim()}
          className="self-end"
        >
          {loading ? '...' : 'Add'}
        </Button>
      </div>
    </div>
  )
}
