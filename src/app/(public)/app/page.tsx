import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get the App | G2K Your City\u2122',
  description:
    'Download the G2K Your City\u2122 app for iOS. Discover local events, hidden gems, AR experiences, and exclusive deals in Henderson, NC.',
  openGraph: {
    title: 'Get the G2K\u2122 App',
    description:
      'Download the G2K Your City\u2122 app and start exploring Henderson.',
    url: 'https://g2kyourcity.com/app',
  },
}

const features = [
  {
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    title: 'Interactive Map',
    description:
      'Explore Henderson on a beautifully designed map with every local business, park, and hidden gem pinned.',
  },
  {
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Local Events',
    description:
      'Never miss what\'s happening. Festivals, markets, concerts, community gatherings — all in one place.',
  },
  {
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z',
    title: 'AR Emblems',
    description:
      'Spin augmented reality emblems at local businesses to unlock deals, discounts, and surprises.',
  },
  {
    icon: 'M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z',
    title: 'Deals & Coupons',
    description:
      'Exclusive offers from Henderson businesses. Show your phone at checkout and save.',
  },
  {
    icon: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    title: 'Explorer Levels',
    description:
      'Earn XP by visiting places and attending events. Level up and unlock badges as you explore your city.',
  },
  {
    icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
    title: 'Community',
    description:
      'Connect with locals, share recommendations, and help build the definitive guide to Henderson.',
  },
]

export default function AppPage() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
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
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3"
                  />
                </svg>
                Coming Soon to iOS
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Your City,<br />In Your Pocket
              </h1>
              <p className="text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 mb-8">
                The G2K app puts Henderson at your fingertips. Explore the
                interactive map, discover events, spin AR emblems for deals,
                and level up as you explore.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="relative">
                  <Image
                    src="/images/app-store-badge.svg"
                    alt="Download on the App Store"
                    width={180}
                    height={54}
                    className="opacity-60"
                  />
                  <span className="absolute -top-2 -right-2 bg-gold text-navy text-[10px] font-bold px-2 py-0.5 rounded-full">
                    SOON
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-64 h-[520px] bg-navy-light rounded-[3rem] border-4 border-gray-600 flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-20 h-20 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-gold text-3xl font-bold">G2K</span>
                  </div>
                  <p className="text-gray-400 text-sm">
                    App preview coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-gold font-medium text-sm uppercase tracking-wider">
              App Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
              Everything You Need to Explore Henderson
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-gray-50 rounded-2xl p-8 card-hover"
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
                      d={feature.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify CTA */}
      <section className="py-16 md:py-24 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Be the First to Know When We Launch
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            The app is in development and coming soon. In the meantime, explore
            Henderson on our website and get involved with the community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/henderson" className="btn-secondary text-center">
              Explore Henderson
            </Link>
            <Link
              href="/community"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white hover:text-navy text-center"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
