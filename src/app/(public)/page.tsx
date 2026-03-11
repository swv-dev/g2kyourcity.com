'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

const AppScreensShowcase = dynamic(
  () => import('@/components/AppScreensShowcase'),
  { ssr: false }
)

export default function Home() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center"
      style={{
        backgroundImage: 'url(/images/bg_dotted_white.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="mb-6">
              <Image
                src="/images/g2k-your-city-logo-full.png"
                alt="Get 2 Know Your City"
                width={500}
                height={500}
                className="w-full max-w-md mx-auto lg:mx-0"
                priority
              />
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover local events, hidden gems, and unique experiences in your community.
              One app, every city.
            </p>

            {/* City links */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Explore a City
              </h2>
              <Link
                href="/henderson"
                className="inline-flex items-center gap-3 bg-white border-2 border-navy rounded-xl px-6 py-4 hover:bg-navy hover:text-white transition-colors group"
              >
                <span className="text-lg font-semibold text-navy group-hover:text-white">
                  Henderson, NC
                </span>
                <span className="text-sm text-gray-500 group-hover:text-gray-300">
                  Vance County
                </span>
                <svg className="w-5 h-5 ml-auto text-navy group-hover:text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <p className="text-sm text-gray-400 mt-3">More cities coming soon...</p>
            </div>
          </div>

          {/* App Screenshots Showcase */}
          <div className="relative flex flex-col items-center">
            <div className="transform scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100 origin-top">
              <AppScreensShowcase />
            </div>

            {/* App store badge */}
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm mb-2">Coming soon to</p>
              <div className="flex justify-center gap-4">
                <Image
                  src="/images/app-store-badge.svg"
                  alt="Download on the App Store"
                  width={140}
                  height={42}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
