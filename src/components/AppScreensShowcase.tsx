'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

const screens = [
  {
    src: '/images/app-screens/home.jpg',
    label: 'Home',
    bubble: 'Featured events, local places, and curated experiences — all in one feed.',
  },
  {
    src: '/images/app-screens/map-3d.jpg',
    label: 'Explore Map',
    bubble: '3D interactive map with your profile photo as a pin, proximity ring, and every local spot marked.',
  },
  {
    src: '/images/app-screens/map-night.jpg',
    label: 'Night Mode',
    bubble: 'Explore after dark with a stunning 3D night map — every pin glows so you never miss a spot.',
  },
  {
    src: '/images/app-screens/spin-disc.jpg',
    label: 'Spin & Win',
    bubble: 'Spin the place disc to earn XP and unlock real perks from local businesses.',
    disclaimer: 'Perk shown is an example only. This specific reward is not currently offered by this business.',
  },
  {
    src: '/images/app-screens/oxford-home.jpg',
    label: 'Multi-County',
    bubble: 'Switch between Henderson, Oxford, Warrenton, Franklinton, and Roxboro — 5 counties, one app.',
  },
  {
    src: '/images/app-screens/place-detail.jpg',
    label: 'Place Details',
    bubble: 'Real photos, ratings, hours, contact info, and walking directions for every place.',
  },
  {
    src: '/images/app-screens/places.jpg',
    label: 'Places',
    bubble: 'Browse 200+ places by category with real photos, distance, and ratings.',
  },
  {
    src: '/images/app-screens/events-v2.jpg',
    label: 'Events',
    bubble: 'Never miss what\'s happening — upcoming events with photos, category filters, and real community happenings.',
  },
  {
    src: '/images/app-screens/passport-trails.jpg',
    label: 'Passport Trails',
    bubble: 'Themed trails across all 5 Kerr-Tar counties. Complete stops to earn exclusive badges.',
  },
  {
    src: '/images/app-screens/profile-stats.jpg',
    label: 'Explorer Score',
    bubble: '973 XP, 16 check-ins, 7-day streak — track your stats and climb the leaderboard.',
  },
]

export default function AppScreensShowcase() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [bubbleVisible, setBubbleVisible] = useState(true)

  const next = useCallback(() => {
    setBubbleVisible(false)
    setTimeout(() => {
      setCurrent(i => (i + 1) % screens.length)
      setBubbleVisible(true)
    }, 300)
  }, [])

  const prev = useCallback(() => {
    setBubbleVisible(false)
    setTimeout(() => {
      setCurrent(i => (i - 1 + screens.length) % screens.length)
      setBubbleVisible(true)
    }, 300)
  }, [])

  const goTo = useCallback((i: number) => {
    if (i === current) return
    setBubbleVisible(false)
    setTimeout(() => {
      setCurrent(i)
      setBubbleVisible(true)
    }, 300)
  }, [current])

  // Auto-advance every 5s unless hovered
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isHovered, next])

  return (
    <div
      className="relative mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Feature bubble — positioned to the left of the phone */}
      <div
        className={`absolute right-[calc(100%-16px)] top-1/2 -translate-y-1/2 w-[200px] z-10 hidden lg:block transition-all duration-300 ${
          bubbleVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}
      >
        <div className="relative bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
          <p className="text-[13px] font-semibold text-navy mb-1">{screens[current].label}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{screens[current].bubble}</p>
          {screens[current].disclaimer && (
            <p className="text-[9px] text-gray-400 italic leading-snug mt-1.5 pt-1.5 border-t border-gray-100">{screens[current].disclaimer}</p>
          )}
          {/* Arrow pointing right toward phone */}
          <div className="absolute top-1/2 -right-[7px] -translate-y-1/2 w-3.5 h-3.5 bg-white border-r border-b border-gray-100 rotate-[-45deg]" />
        </div>
      </div>

      {/* iPhone frame */}
      <div className="iphone-tilt relative mx-auto" style={{ width: 320, height: 660 }}>
        <div
          className="relative w-full h-full rounded-[40px] bg-black shadow-2xl border-[3px] border-gray-800"
          style={{ isolation: 'isolate', overflow: 'hidden' }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 w-[100px] h-[28px] bg-black rounded-full" />

          {/* Screen content — crossfade between screenshots */}
          <div className="absolute inset-0 top-0 bottom-0 rounded-[37px] overflow-hidden">
            {screens.map((screen, i) => (
              <div
                key={screen.src}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === current ? 1 : 0 }}
              >
                <Image
                  src={screen.src}
                  alt={screen.label}
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                  priority={i < 2}
                />
              </div>
            ))}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 w-[120px] h-[4px] bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Mobile bubble — below phone on smaller screens */}
      <div
        className={`lg:hidden mt-4 mx-auto max-w-[320px] transition-all duration-300 ${
          bubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 text-center">
          <p className="text-[13px] font-semibold text-navy mb-0.5">{screens[current].label}</p>
          <p className="text-[11px] text-gray-500 leading-relaxed">{screens[current].bubble}</p>
          {screens[current].disclaimer && (
            <p className="text-[9px] text-gray-400 italic leading-snug mt-1.5 pt-1.5 border-t border-gray-100">{screens[current].disclaimer}</p>
          )}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-4 mt-4">
        {/* Prev button */}
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {screens.map((screen, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? 'w-6 h-2 bg-navy'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={screen.label}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
