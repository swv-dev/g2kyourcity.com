import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get Involved | G2K Your City\u2122',
  description:
    'Submit local events, recommend businesses, and help build the definitive guide to Henderson and Vance County.',
  openGraph: {
    title: 'Get Involved with G2K',
    description:
      'Submit events, recommend places, and join the community shaping Henderson\'s future.',
    url: 'https://g2kyourcity.com/community',
  },
}

const steps = [
  {
    number: '1',
    title: 'Apply for an Account',
    description:
      'Tell us who you are and what organization you represent. We review every application to keep the community trusted and authentic.',
    cta: { label: 'Apply Now', href: '/apply' },
  },
  {
    number: '2',
    title: 'Get Approved',
    description:
      'Once approved, you\'ll have access to submit events and recommend places directly through G2K. Most applications are reviewed within 24 hours.',
  },
  {
    number: '3',
    title: 'Start Submitting',
    description:
      'Share what\'s happening in Henderson — community events, new businesses, hidden gems. Every submission is reviewed before going live.',
    cta: { label: 'Submit an Event', href: '/submit' },
  },
]

const contributions = [
  {
    icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
    title: 'Community Events',
    description:
      'Festivals, fundraisers, church events, school activities, farmers markets — if it\'s happening in Vance County, it belongs on G2K.',
    examples: ['Heritage Day Festival', 'Friday Night Live Downtown', 'Youth Basketball League Signups'],
  },
  {
    icon: 'M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.999 2.999 0 00.97-1.323L5.138 4.72A2.25 2.25 0 017.313 3h9.374c.918 0 1.742.56 2.084 1.414L19.97 8.03c.175.424.267.88.267 1.32',
    title: 'Local Businesses',
    description:
      'Know a great restaurant, barber shop, or boutique that\'s not on the app yet? Recommend it and help us make the map more complete.',
    examples: ['New restaurant openings', 'Home-based businesses', 'Pop-up shops & vendors'],
  },
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z',
    title: 'Hidden Gems',
    description:
      'Parks, murals, historic landmarks, scenic spots — the places that make Henderson special but don\'t always show up on Google.',
    examples: ['Historic sites', 'Nature trails & parks', 'Public art & murals'],
  },
]

const faqs = [
  {
    q: 'Who can apply?',
    a: 'Anyone with a connection to Henderson or Vance County — residents, business owners, event organizers, community groups, churches, schools, and nonprofits.',
  },
  {
    q: 'How long does approval take?',
    a: 'Most applications are reviewed within 24 hours. We check every application to keep the platform trusted and spam-free.',
  },
  {
    q: 'What happens after I submit something?',
    a: 'Every submission goes through a quick review by our team. Once approved, it goes live on the app and website for the whole community to see.',
  },
  {
    q: 'Can I submit events for someone else?',
    a: 'Absolutely. If you know about a community event that isn\'t listed, submit it on their behalf. Just include the organizer\'s name so people know who\'s hosting.',
  },
  {
    q: 'Is there a cost?',
    a: 'No. Submitting events and recommending places is completely free. G2K is supported by local business sponsorships, not user fees.',
  },
]

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
              Community-Powered
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Help Us Map<br />Henderson&apos;s Best
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              G2K is built by the community, for the community. Submit local
              events, recommend businesses, and help create the definitive guide
              to Vance County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply" className="btn-secondary text-center">
                Apply for an Account
              </Link>
              <Link
                href="/submit"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-navy text-center"
              >
                Submit an Event
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Three Steps to Get Involved
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We keep it simple. Apply, get approved, and start contributing to
              your community&apos;s digital presence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-gold font-bold text-xl mb-5">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                {step.cta && (
                  <Link
                    href={step.cta.href}
                    className="text-navy font-medium hover:text-gold transition-colors inline-flex items-center gap-1"
                  >
                    {step.cta.label}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Submit */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              What You Can Share
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              If It&apos;s Happening in Henderson, It Belongs Here
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From Friday night events to the barber shop everyone loves but nobody
              knows about — we want it all.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {contributions.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 card-hover"
              >
                <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center text-navy mb-5">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ul className="space-y-2">
                  {item.examples.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-center text-sm text-gray-500"
                    >
                      <svg
                        className="w-4 h-4 text-gold mr-2 flex-shrink-0"
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
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                Who Should Apply
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">
                If You Care About Henderson,<br />You Belong Here
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                G2K isn&apos;t just an app — it&apos;s a community effort. We
                want to hear from the people who know Henderson best.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Event organizers — get your events in front of the whole community',
                  'Business owners — make sure your spot is on the map',
                  'Churches & nonprofits — share your programs and outreach',
                  'Schools & coaches — post games, performances, and activities',
                  'Residents — recommend the places and events you love',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-gold mr-3 mt-0.5 flex-shrink-0"
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
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/apply" className="btn-primary inline-block">
                Apply for an Account
              </Link>
            </div>

            {/* Stats card */}
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <h3 className="text-lg font-semibold text-navy mb-6">
                What Trusted Contributors Get
              </h3>
              <div className="space-y-6">
                {[
                  {
                    label: 'Submit Events',
                    desc: 'Post community events that go live after a quick review',
                  },
                  {
                    label: 'Recommend Places',
                    desc: 'Suggest businesses and hidden gems to add to the map',
                  },
                  {
                    label: 'Community Recognition',
                    desc: 'Your contributions help shape Henderson\'s digital presence',
                  },
                  {
                    label: 'Direct Line to G2K',
                    desc: 'Approved contributors can flag issues and suggest improvements',
                  },
                ].map((perk) => (
                  <div key={perk.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-navy/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-navy"
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
                    <div>
                      <p className="font-semibold text-navy">{perk.label}</p>
                      <p className="text-sm text-gray-500">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6">
                <h3 className="font-semibold text-navy mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Involved?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Henderson has more going on than people realize. Help us prove it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="btn-secondary text-center">
              Apply for an Account
            </Link>
            <Link
              href="/submit"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-navy text-center"
            >
              Submit an Event
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
