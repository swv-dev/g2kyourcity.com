'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || ''

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    formData.set('redirect', redirectTo)
    const result = await signIn(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 gap-6 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-navy">
            Sign In to G2K
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Your password"
                required
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
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Need an account?{' '}
            <a href="/apply" className="text-navy font-medium hover:underline">
              Apply here
            </a>
          </p>
        </CardContent>
      </Card>

      {/* Partner Portal */}
      <div className="w-full max-w-md flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400 uppercase tracking-wide">Business Partners</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <Card className="w-full max-w-md border-navy/20">
        <CardContent className="pt-6 flex flex-col items-center text-center gap-3">
          <div className="flex items-center justify-center font-bold text-sm rounded bg-navy text-white w-10 h-10 tracking-tight">
            G2K
          </div>
          <div>
            <h2 className="font-semibold text-navy">Partner Portal</h2>
            <p className="text-sm text-gray-500 mt-1">
              Access foot traffic analytics, visit trends, and insights for your listed business.
            </p>
          </div>
          <a
            href="https://partners.g2kyourcity.com"
            className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-md bg-navy text-white text-sm font-medium hover:bg-navy-dark transition-colors"
          >
            Go to Partner Portal
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
