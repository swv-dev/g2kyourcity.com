import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Events | G2K Your City\u2122',
  description:
    'Upcoming events in Henderson and Vance County, NC. Festivals, community gatherings, markets, and more.',
  openGraph: {
    title: 'Events in Henderson, NC',
    description:
      'Discover upcoming events in Henderson and Vance County.',
    url: 'https://g2kyourcity.com/events',
  },
}

const categoryColors: Record<string, string> = {
  Shopping: 'bg-green-100 text-green-800',
  Arts: 'bg-purple-100 text-purple-800',
  Entertainment: 'bg-blue-100 text-blue-800',
  Community: 'bg-orange-100 text-orange-800',
  Sports: 'bg-red-100 text-red-800',
  Food: 'bg-yellow-100 text-yellow-800',
  Family: 'bg-pink-100 text-pink-800',
  Music: 'bg-indigo-100 text-indigo-800',
}

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('moderation_status', 'approved')
    .gte('start_date', new Date().toISOString())
    .order('start_date', { ascending: true })

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Events in Henderson
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything happening in Vance County — festivals, community
            gatherings, markets, and more.
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {events && events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl p-6 card-hover border border-gray-100"
                >
                  {event.image_url && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-navy/10 text-navy">
                      Event
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  <div className="space-y-2 text-sm text-gray-600">
                    <p className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(event.start_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    {event.location && (
                      <p className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gold"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </p>
                    )}
                    {event.organizer && (
                      <p className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gold"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {event.organizer}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/event/${event.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:text-navy transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Check In
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">
                No upcoming events yet
              </h3>
              <p className="text-gray-500 mb-6">
                Be the first to share what&apos;s happening in Henderson.
              </p>
              <Link href="/submit" className="btn-primary inline-block">
                Submit an Event
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-16 md:py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Know About an Upcoming Event?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Help us keep the community connected. Submit your event and reach
            locals and visitors alike.
          </p>
          <Link href="/submit" className="btn-secondary inline-block">
            Submit an Event
          </Link>
        </div>
      </section>
    </>
  )
}
