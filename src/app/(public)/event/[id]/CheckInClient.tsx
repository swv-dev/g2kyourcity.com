'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { EventRow } from './page'

type CheckInState = 'idle' | 'checking-in' | 'success' | 'error'

function getSessionAnonId(): string {
  const key = 'g2k_anon_id'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
  }
  return id
}

function formatEventDate(startDate: string, endDate: string | null): string {
  const start = new Date(startDate)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit' }
  const dateStr = start.toLocaleDateString('en-US', options)
  const timeStr = start.toLocaleTimeString('en-US', timeOptions)

  if (endDate) {
    const end = new Date(endDate)
    const endTimeStr = end.toLocaleTimeString('en-US', timeOptions)
    return `${dateStr}, ${timeStr} – ${endTimeStr}`
  }

  return `${dateStr} at ${timeStr}`
}

export function CheckInClient({ event }: { event: EventRow }) {
  const [state, setState] = useState<CheckInState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleCheckIn() {
    setState('checking-in')
    try {
      const supabase = createClient()
      const anonId = getSessionAnonId()

      // Table was added after types were generated — cast to any for now
      const { error } = await (supabase as any).from('analytics_event_checkins').insert({
        anon_id: anonId,
        event_id: event.id,
        source: 'web',
        occurred_at: new Date().toISOString(),
        app_version: null,
      })

      if (error) throw error
      setState('success')
    } catch (err) {
      console.error('Check-in failed:', err)
      setErrorMessage('Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="section-padding flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="mx-auto w-full max-w-md">
          <div className="text-7xl">🎉</div>
          <h1 className="mt-6 text-3xl font-bold text-navy">You&apos;re Checked In!</h1>
          <p className="mt-3 text-lg text-gray-600">
            Thanks for attending{' '}
            <span className="font-semibold text-navy">{event.title}</span>
          </p>

          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
              Get the Full Experience
            </p>
            <h2 className="mt-2 text-xl font-bold text-navy">Download G2K Henderson</h2>
            <p className="mt-2 text-sm text-gray-600">
              Earn XP, unlock Explorer levels, discover events and hidden gems across Vance County.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/20 bg-navy/5 px-6 py-3 text-sm font-medium text-navy">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Coming Soon on iOS
            </div>
          </div>

          <a href="/events" className="mt-8 inline-block text-sm text-navy/60 transition hover:text-navy">
            Browse more events &rarr;
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding flex min-h-[60vh] flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-lg">
        {event.image_url && (
          <div className="mb-6 overflow-hidden rounded-2xl shadow-md">
            <img
              src={event.image_url}
              alt={event.title}
              className="h-48 w-full object-cover sm:h-56"
            />
          </div>
        )}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-dark">
            Event Check-In
          </p>
          <h1 className="mt-3 text-2xl font-bold text-navy sm:text-3xl">{event.title}</h1>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              <span>{formatEventDate(event.start_date, event.end_date)}</span>
            </div>

            {event.location && (
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span>
                  {event.location}
                  {event.address && (
                    <>
                      <br />
                      <span className="text-gray-400">{event.address}</span>
                    </>
                  )}
                </span>
              </div>
            )}

            {event.organizer && (
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <span>Hosted by {event.organizer}</span>
              </div>
            )}
          </div>

          {event.description && (
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              {event.description.length > 200 ? event.description.slice(0, 200) + '...' : event.description}
            </p>
          )}
        </div>

        <div className="mt-6 text-center">
          {state === 'error' && (
            <p className="mb-3 text-sm text-red-500">{errorMessage}</p>
          )}
          <button
            onClick={handleCheckIn}
            disabled={state === 'checking-in'}
            className="btn-secondary w-full rounded-full py-4 text-lg disabled:opacity-50"
          >
            {state === 'checking-in' ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Checking In...
              </span>
            ) : (
              'Check In Now'
            )}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">Want to earn XP and track your adventures?</p>
          <p className="mt-1 text-sm font-medium text-gold-dark">Download the G2K Henderson app</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-navy/10 bg-navy/5 px-4 py-2 text-xs text-navy/70">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Coming Soon on iOS
          </div>
        </div>
      </div>
    </div>
  )
}
