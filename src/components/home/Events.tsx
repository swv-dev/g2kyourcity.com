import Link from 'next/link'

// Real upcoming events for Henderson/Vance County 2026
const upcomingEvents = [
  {
    id: 1,
    title: 'The Drum Prophet Concert',
    date: 'February 24, 2026',
    time: '1:00 PM - 3:00 PM',
    location: 'Vance County Senior Center',
    category: 'Arts',
    description: 'An energizing drumming and vocal concert featuring The Drum Prophet from Raleigh, NC.',
    isFree: true,
  },
  {
    id: 2,
    title: 'American 250 Committee Meeting',
    date: 'March 5, 2026',
    time: '10:00 AM - 11:30 AM',
    location: 'Economic Development Building',
    category: 'Community',
    description: 'Planning for America\'s 250th anniversary celebration in Vance County.',
    isFree: true,
  },
  {
    id: 3,
    title: '4th Annual Eggcellent Eggstravaganza',
    date: 'April 18, 2026',
    time: '11:00 AM - 2:00 PM',
    location: 'Fox Pond Park',
    category: 'Family',
    description: 'Free food, music, egg hunt, and much more for the whole family!',
    isFree: true,
  },
  {
    id: 4,
    title: 'Hop, Run & Fun 5K',
    date: 'April 11, 2026',
    time: 'Morning',
    location: 'Henderson',
    category: 'Sports',
    description: 'Spring 5K run/walk event for all ages and fitness levels.',
    isFree: false,
  },
  {
    id: 5,
    title: 'Henderson Farmers Market',
    date: 'Every Saturday',
    time: '8:00 AM - 1:00 PM',
    location: 'Downtown Henderson',
    category: 'Shopping',
    description: 'Fresh local produce, crafts, and community connection.',
    isFree: true,
  },
  {
    id: 6,
    title: 'Kerr Lake Summer Concert Series',
    date: 'Summer 2026',
    time: 'Evenings',
    location: 'Kerr Lake State Recreation Area',
    category: 'Entertainment',
    description: 'Live music at the lake throughout the summer months.',
    isFree: true,
  },
]

const categoryColors: Record<string, string> = {
  Shopping: 'bg-green-100 text-green-800',
  Arts: 'bg-purple-100 text-purple-800',
  Entertainment: 'bg-blue-100 text-blue-800',
  Community: 'bg-orange-100 text-orange-800',
  Sports: 'bg-red-100 text-red-800',
  Food: 'bg-yellow-100 text-yellow-800',
  Family: 'bg-pink-100 text-pink-800',
}

export default function Events() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Upcoming Events in Henderson
            </h2>
            <p className="text-gray-600 max-w-xl">
              Vance County has activities all year round. From festivals to community gatherings,
              there&apos;s always something happening.
            </p>
          </div>
          <Link
            href="/events"
            className="btn-outline mt-6 md:mt-0 text-center"
          >
            View All Events
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="bg-gray-50 rounded-xl p-6 card-hover border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[event.category] || 'bg-gray-100 text-gray-800'}`}>
                  {event.category}
                </span>
                {event.isFree && (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                    FREE
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-navy mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {event.description}
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {event.date}
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.time}
                </p>
                <p className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-navy rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Have an Event to Share?
          </h3>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">
            Help us keep the community connected. Submit your event and reach locals and visitors alike.
          </p>
          <Link href="/submit-event" className="btn-secondary">
            Submit an Event
          </Link>
        </div>
      </div>
    </section>
  )
}
