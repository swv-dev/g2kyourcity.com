import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { CheckInClient } from './CheckInClient'

export interface EventRow {
  id: string
  title: string
  description: string | null
  start_date: string
  end_date: string | null
  location: string | null
  address: string | null
  organizer: string | null
  image_url: string | null
}

interface PageProps {
  params: Promise<{ id: string }>
}

async function getEvent(id: string): Promise<EventRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('events')
    .select(
      'id, title, description, start_date, end_date, location, address, organizer, image_url'
    )
    .eq('id', id)
    .eq('moderation_status', 'approved')
    .single()

  if (error || !data) return null
  return data as EventRow
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const event = await getEvent(id)

  if (!event) {
    return { title: 'Event Not Found | G2K Your City\u2122' }
  }

  const description = (event.description || '').slice(0, 160)

  return {
    title: `${event.title} | G2K Your City\u2122`,
    description,
    openGraph: {
      title: event.title,
      description,
      type: 'website',
      ...(event.image_url ? { images: [{ url: event.image_url }] } : {}),
    },
  }
}

export default async function EventCheckInPage({ params }: PageProps) {
  const { id } = await params
  const event = await getEvent(id)

  if (!event) {
    return (
      <div className="section-padding flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-6xl">🔍</p>
        <h1 className="mt-6 text-3xl font-bold text-navy">Event Not Found</h1>
        <p className="mt-3 text-lg text-gray-600">
          This event may have ended or the link may be invalid.
        </p>
        <a href="/" className="btn-secondary mt-8 inline-block rounded-full">
          Visit G2K Your City&trade;
        </a>
      </div>
    )
  }

  return <CheckInClient event={event} />
}
