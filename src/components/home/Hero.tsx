'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setHasStarted(true)
        })
        .catch((error) => {
          console.error('Video play failed:', error)
        })
    }
  }

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        handlePlay()
      }
    }
  }

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

          {/* Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video
                ref={videoRef}
                className="w-full hero-video cursor-pointer"
                poster="/images/g2k_poster.png"
                playsInline
                onClick={handleVideoClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false)
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0
                  }
                }}
              >
                <source src="/videos/g2k_promo_final.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Play button overlay */}
              {!isPlaying && (
                <button
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
                  aria-label="Play video"
                >
                  <div className="w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-navy ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              )}
            </div>

            {/* App store badge */}
            <div className="mt-6 text-center">
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
