'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createPartner } from './actions'
import type { PartnerTier } from '@/types/supabase'

export default function CreatePartnerDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [orgName, setOrgName] = useState('')
  const [tier, setTier] = useState<PartnerTier>('basic')
  const [placeIds, setPlaceIds] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await createPartner({
      email,
      password,
      displayName,
      orgName,
      tier,
      placeIds: placeIds
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    })

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      setOpen(false)
      setEmail('')
      setPassword('')
      setDisplayName('')
      setOrgName('')
      setTier('basic')
      setPlaceIds('')
    }
  }

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)}>
        Create Partner
      </Button>
    )
  }

  return (
    <Card className="max-w-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-navy">Create Partner Account</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="partner@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
            <input
              type="text"
              required
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Henderson EDC"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Partner Tier</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTier('basic')}
                className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  tier === 'basic'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Basic
              </button>
              <button
                type="button"
                onClick={() => setTier('premium')}
                className={`flex-1 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${
                  tier === 'premium'
                    ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Place IDs <span className="text-gray-400 font-normal">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={placeIds}
              onChange={(e) => setPlaceIds(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm font-mono"
              placeholder="ChIJ..., ChIJ..."
            />
            <p className="text-xs text-gray-400 mt-1">
              Google Place IDs for locations this partner can view analytics for
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Creating...' : 'Create Partner'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
