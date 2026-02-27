import Image from 'next/image'
import Link from 'next/link'

// Podcast hosts
const hosts = [
  { name: 'Stephen', role: 'Host' },
  { name: 'TBD', role: 'Co-Host' },
  { name: 'TBD', role: 'Co-Host' },
  { name: 'TBD', role: 'Co-Host' },
]

// Featured/upcoming episodes
const episodes = [
  {
    id: 'ep-preview-1',
    number: 'Coming Soon',
    title: 'The Vision for Henderson\'s Future',
    guest: 'Local Government Leaders',
    description: 'A candid conversation about economic development, community priorities, and what\'s next for Vance County.',
    duration: null,
    status: 'upcoming',
  },
  {
    id: 'ep-preview-2',
    number: 'Coming Soon',
    title: 'Small Business, Big Dreams',
    guest: 'Henderson Business Owners',
    description: 'Local entrepreneurs share their stories, challenges, and what keeps them rooted in our community.',
    duration: null,
    status: 'upcoming',
  },
  {
    id: 'ep-preview-3',
    number: 'Coming Soon',
    title: 'Preserving Our History',
    guest: 'Community Historians',
    description: 'Exploring Henderson\'s rich past and the efforts to keep our heritage alive for future generations.',
    duration: null,
    status: 'upcoming',
  },
]

// Written stories (companion content)
const stories = [
  {
    id: 'henderson-250',
    title: 'Henderson Prepares for America\'s 250th Anniversary Celebration',
    excerpt: 'As the nation gears up for its semiquincentennial in 2026, Vance County is planning a year-long celebration.',
    category: 'Community',
    date: 'February 2026',
  },
  {
    id: 'kerr-lake-guide',
    title: 'Your Ultimate Guide to Kerr Lake',
    excerpt: 'The best fishing holes, secluded beaches, and sunset views that only locals know about.',
    category: 'Outdoors',
    date: 'February 2026',
  },
  {
    id: 'downtown-revival',
    title: 'Downtown Henderson: A Revival in Progress',
    excerpt: 'New businesses and restored facades are breathing new life into historic downtown.',
    category: 'Business',
    date: 'February 2026',
  },
  {
    id: 'local-eats',
    title: '10 Must-Try Restaurants in Vance County',
    excerpt: 'Forget the chains. These locally-owned spots serve up legendary flavors.',
    category: 'Food',
    date: 'January 2026',
  },
]

const categoryColors: Record<string, string> = {
  Community: 'bg-orange-100 text-orange-800',
  Outdoors: 'bg-green-100 text-green-800',
  Business: 'bg-blue-100 text-blue-800',
  Food: 'bg-yellow-100 text-yellow-800',
}

export default function LocalLoopPage() {
  return (
    <>
      {/* Hero - Podcast Focus */}
      <section className="relative bg-navy text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1 1.93c-3.94-.49-7-3.85-7-7.93V7h2v1c0 2.76 2.24 5 5 5s5-2.24 5-5V7h2v1c0 4.08-3.06 7.44-7 7.93V19h3v2H9v-2h3v-3.07z"/>
                </svg>
                Podcast
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                The Local Loop
              </h1>
              <p className="text-2xl md:text-3xl text-gold font-medium mb-6">
                Real Talk. Real People. Our Hometown.
              </p>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Zero scripts. Real stories. The people making Henderson happen.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-secondary inline-flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Coming Soon
                </button>
                <a href="#episodes" className="btn-outline border-white text-white hover:bg-white hover:text-navy">
                  See Upcoming Episodes
                </a>
              </div>
            </div>

            {/* Podcast artwork/visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 rounded-3xl p-8 md:p-12">
                <div className="bg-navy-dark rounded-2xl p-8 shadow-2xl">
                  {/* Microphone visualization */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-navy" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                        </svg>
                      </div>
                      {/* Sound waves */}
                      <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-1 h-8 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1 h-12 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1 h-6 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                      </div>
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-1 h-6 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                        <div className="w-1 h-12 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1 h-8 bg-gold/60 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                      </div>
                    </div>
                  </div>

                  {/* Hosts */}
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-3">Your Hosts</p>
                    <div className="flex justify-center -space-x-2">
                      {hosts.map((host, i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-navy-light to-navy border-2 border-navy-dark flex items-center justify-center"
                          title={host.name}
                        >
                          <span className="text-white font-medium text-sm">
                            {host.name === 'TBD' ? '?' : host.name[0]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-white mt-3 font-medium">4 Hosts · Weekly Episodes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is The Local Loop */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Unfiltered Conversations About Our Community
            </h2>
            <p className="text-xl text-gray-600">
              The Local Loop brings you face-to-face with the people who make Henderson tick.
              No scripts. No spin. Just honest conversations about the issues, ideas, and
              stories that matter to Vance County.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">Local Leaders</h3>
              <p className="text-gray-600">
                Mayors, council members, and county commissioners share their vision and answer your questions.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">Business Owners</h3>
              <p className="text-gray-600">
                Entrepreneurs and shop owners tell their stories of building dreams in Henderson.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">Community Voices</h3>
              <p className="text-gray-600">
                Teachers, coaches, volunteers, and everyday heroes making a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Episodes */}
      <section id="episodes" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">In Production</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
              Upcoming Episodes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {episodes.map((episode, index) => (
              <div
                key={episode.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover"
              >
                <div className="h-32 bg-gradient-to-br from-navy to-navy-light flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-gold font-bold text-lg">{episode.number}</div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold/20 text-gold text-xs font-medium px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gold font-medium mb-2">
                    Featuring: {episode.guest}
                  </p>
                  <h3 className="text-xl font-semibold text-navy mb-3">
                    {episode.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {episode.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-16 bg-navy rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Be the First to Listen
            </h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              The Local Loop is coming soon. Sign up to get notified when we drop our first episode
              and never miss a conversation.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-gold"
              />
              <button type="submit" className="btn-secondary whitespace-nowrap">
                Notify Me
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Be a Guest */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">Join Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
                Have a Story Worth Sharing?
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                The Local Loop is looking for guests who are making an impact in Henderson and Vance County.
                Whether you&apos;re a local official, business owner, nonprofit leader, or community organizer,
                we want to hear your story.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Local government officials and candidates</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Small business owners and entrepreneurs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Nonprofit and community organization leaders</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Educators, coaches, and community volunteers</span>
                </li>
              </ul>
              <a href="mailto:info@g2khenderson.com?subject=Local Loop Guest Inquiry" className="btn-primary">
                Pitch Your Story
              </a>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <blockquote className="text-xl text-navy italic mb-6">
                &ldquo;Every person in Henderson has a story. The Local Loop is our way of making sure
                those stories get heard.&rdquo;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white font-bold mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold text-navy">Stephen</div>
                  <div className="text-gray-500 text-sm">Host, The Local Loop</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Written Stories Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">Beyond the Mic</span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Stories &amp; Articles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Can&apos;t wait for the podcast? Dive into our written features about Henderson life,
              local guides, and community spotlights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stories.map((story) => (
              <article
                key={story.id}
                className="bg-white rounded-xl p-6 card-hover"
              >
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[story.category]}`}>
                  {story.category}
                </span>
                <h3 className="font-semibold text-navy mb-2 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
