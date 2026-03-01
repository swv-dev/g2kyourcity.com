'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { submitEvent } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SubmitEventForm() {
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
              Event Submitted
            </h2>
            <p className="text-gray-600">
              Your event has been submitted for review. We&apos;ll approve it
              shortly.
            </p>
            <a
              href="/submit"
              className="inline-block mt-4 text-navy font-medium hover:underline"
            >
              Submit another event
            </a>
          </CardContent>
        </Card>
      </div>
    )
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await submitEvent(formData)
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
            Submit an Event
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Share a local event with the Henderson community
          </p>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Downtown Heritage Festival"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell us about the event"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Venue Name</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="e.g. Fox Pond Park"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  name="organizer"
                  placeholder="Who's hosting?"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St, Henderson, NC"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">Start Date & Time *</Label>
                <Input
                  id="start_date"
                  name="start_date"
                  type="datetime-local"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end_date">End Date & Time</Label>
                <Input
                  id="end_date"
                  name="end_date"
                  type="datetime-local"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                type="url"
                placeholder="https://example.com/event-image.jpg"
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
              {loading ? 'Submitting...' : 'Submit Event'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
