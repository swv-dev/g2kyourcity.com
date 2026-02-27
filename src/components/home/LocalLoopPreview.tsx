import Link from 'next/link'

const recentStories = [
  {
    id: 'henderson-250',
    title: 'Henderson Prepares for America\'s 250th Anniversary Celebration',
    excerpt: 'As the nation gears up for its semiquincentennial in 2026, Vance County is planning a year-long celebration that honors our rich history.',
    category: 'Community',
    date: 'February 2026',
  },
  {
    id: 'kerr-lake-guide',
    title: 'Your Ultimate Guide to Kerr Lake: Hidden Spots Only Locals Know',
    excerpt: 'The best fishing holes, secluded beaches, and sunset views aren\'t on any tourist map. Here\'s the insider\'s guide.',
    category: 'Outdoors',
    date: 'February 2026',
  },
  {
    id: 'downtown-revival',
    title: 'Downtown Henderson: A Revival in Progress',
    excerpt: 'New businesses, restored facades, and a growing arts scene are breathing new life into historic downtown.',
    category: 'Business',
    date: 'February 2026',
  },
]

const categoryColors: Record<string, string> = {
  Community: 'bg-orange-100 text-orange-800',
  Outdoors: 'bg-green-100 text-green-800',
  Business: 'bg-blue-100 text-blue-800',
}

export default function LocalLoopPreview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-gold font-medium text-sm uppercase tracking-wider">From The Local Loop</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Stories From Our Community
            </h2>
            <p className="text-gray-600 max-w-xl">
              The latest news, hidden gems, and voices from Henderson and Vance County.
              Real stories from the people who call this place home.
            </p>
          </div>
          <Link
            href="/local-loop"
            className="btn-outline mt-6 md:mt-0 text-center"
          >
            Read All Stories
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recentStories.map((story, index) => (
            <article
              key={story.id}
              className={`bg-white rounded-xl overflow-hidden card-hover ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              {index === 0 ? (
                // Featured story layout
                <div className="h-full flex flex-col">
                  <div className="h-48 md:h-64 bg-navy relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-7xl font-bold text-gold mb-2">250</div>
                        <div className="text-lg">Years of America</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[story.category]}`}>
                        {story.category}
                      </span>
                      <span className="text-sm text-gray-400">{story.date}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-navy mb-3">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 mb-6 flex-grow">
                      {story.excerpt}
                    </p>
                    <Link
                      href={`/local-loop/${story.id}`}
                      className="text-navy font-semibold hover:text-gold transition-colors inline-flex items-center"
                    >
                      Read the full story
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ) : (
                // Regular story layout
                <div className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[story.category]}`}>
                      {story.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-navy mb-2 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{story.date}</span>
                    <Link
                      href={`/local-loop/${story.id}`}
                      className="text-navy font-medium text-sm hover:text-gold transition-colors"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Why Local Loop matters */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-navy mb-4">
                Why The Local Loop?
              </h3>
              <p className="text-gray-600 mb-4">
                Every community has stories that deserve to be told. The Local Loop is our commitment to
                amplifying the voices, celebrating the wins, and sharing the moments that make Henderson special.
              </p>
              <p className="text-gray-600 mb-6">
                From the family-owned restaurant serving generations to the volunteer coaching little league,
                these are the stories that don&apos;t make headlines but make our town a home.
              </p>
              <Link href="/local-loop" className="btn-primary">
                Explore The Local Loop
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-navy">50+</div>
                <div className="text-sm text-gray-600">Local Stories</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-navy">12</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-navy">100+</div>
                <div className="text-sm text-gray-600">Local Voices</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-navy">Weekly</div>
                <div className="text-sm text-gray-600">New Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
