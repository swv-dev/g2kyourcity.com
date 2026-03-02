'use client'

import { useState } from 'react'
import { submitLeadForm } from './actions'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    const result = await submitLeadForm(formData)
    if (result.error) {
      setErrorMsg(result.error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-navy mb-2">Inquiry Submitted!</h3>
          <p className="text-gray-600">
            Thanks for your interest. We&apos;ll reach out within 1 business day to
            discuss how G2K can help grow your business.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-8">
        <h3 className="text-xl font-semibold text-navy mb-2">Interested? Let&apos;s Talk.</h3>
        <p className="text-gray-500 text-sm mb-6">
          Fill out the form below and we&apos;ll be in touch within 1 business day.
        </p>
        <form action={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name *</Label>
              <Input id="business_name" name="business_name" required placeholder="Your business" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_name">Your Name *</Label>
              <Input id="contact_name" name="contact_name" required placeholder="Full name" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lead_email">Email *</Label>
              <Input id="lead_email" name="email" type="email" required placeholder="you@business.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead_phone">Phone</Label>
              <Input id="lead_phone" name="phone" type="tel" placeholder="(555) 555-5555" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" type="url" placeholder="https://yourbusiness.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tier_interest">Tier Interest</Label>
              <select
                id="tier_interest"
                name="tier_interest"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Not sure yet</option>
                <option value="basic">Basic ($49/mo)</option>
                <option value="premium">Premium ($99/mo)</option>
                <option value="elite">Elite ($199/mo)</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead_message">Message</Label>
            <Textarea
              id="lead_message"
              name="message"
              rows={4}
              placeholder="Tell us about your business and what you're looking for..."
            />
          </div>
          {status === 'error' && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}
          <Button
            type="submit"
            className="w-full bg-gold text-navy hover:bg-gold-dark font-semibold"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
