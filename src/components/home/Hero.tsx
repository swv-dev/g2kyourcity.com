'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

const SimulatorShell = dynamic(
  () => import('../simulator/SimulatorShell'),
  { ssr: false }
)

export default function Hero() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
              Explore Local Events &amp; Unique Experiences
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover what makes Henderson and Vance County special. From community gatherings to hidden gems,
              your guide to everything local is here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/events" className="btn-primary text-center">
                Explore Events
              </Link>
              <Link href="#app-features" className="btn-outline text-center">
                Learn About the App
              </Link>
            </div>
          </div>

          {/* Interactive App Simulator */}
          <div className="relative flex flex-col items-center">
            <div className="transform scale-[0.85] sm:scale-90 md:scale-95 lg:scale-100 origin-top">
              <SimulatorShell />
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
