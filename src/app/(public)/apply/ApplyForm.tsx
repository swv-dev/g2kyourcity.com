'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { applyForAccount } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ApplyForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const success = searchParams.get('success')

  if (success) {
    return (
      <div className="flex items-center justify-center bg-gray-50 px-4 py-16 md:py-24">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy mb-2">
              Application Submitted
            </h2>
            <p className="text-gray-600">
              Your account application has been received. We&apos;ll review it
              and get back to you soon.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await applyForAccount(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 py-16 md:py-24 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-navy">
            Apply for a G2K Account
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Join the community and start submitting events
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="display_name">Your Name *</Label>
              <Input
                id="display_name"
                name="display_name"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org_name">
                Organization Name{' '}
                <span className="text-gray-400">(if applicable)</span>
              </Label>
              <Input
                id="org_name"
                name="org_name"
                placeholder="Your business or organization"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Tell us about yourself</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Why do you want to join G2K?"
                rows={3}
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-md p-3">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="w-full bg-navy hover:bg-navy-dark"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-navy font-medium hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
