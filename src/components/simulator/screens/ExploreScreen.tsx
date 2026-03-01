'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Place, Category } from '../types'
import SimNavBar from '../shared/SimNavBar'
import CategoryPill from '../shared/CategoryPill'

const MapInner = dynamic(() => import('./MapInner'), { ssr: false })

interface ExploreScreenProps {
  places: Place[]
  categories: Category[]
  onPinTap: (place: Place) => void
  onAROpen: () => void
}

export default function ExploreScreen({ places, categories, onPinTap, onAROpen }: ExploreScreenProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [is3D, setIs3D] = useState(false)
  const [showTrails, setShowTrails] = useState(false)

  const filteredPlaces = activeCategory
    ? places.filter(p => p.category === activeCategory)
    : places

  return (
    <div className="h-full flex flex-col" data-tour="map">
      <SimNavBar title="Explore" />

      {/* Map fills remaining space */}
      <div className="flex-1 relative">
        <div className="absolute inset-0" style={{ bottom: 52 }}>
          <MapInner places={filteredPlaces} categories={categories} onPinTap={onPinTap} />
        </div>

        {/* Category filter bar — matches iOS ultraThinMaterial overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-md px-3 py-2">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap transition-all ${
                !activeCategory ? 'bg-[#1B365D] text-white' : 'bg-white text-[#1A1A1A]'
              }`}
            >
              All
            </button>
            {categories.slice(0, 8).map((cat) => (
              <CategoryPill
                key={cat.id}
                name={cat.name}
                emoji={cat.emoji}
                colorHex={cat.colorHex}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Map control buttons — top right, matches iOS: 44pt circles stacked */}
        <div className="absolute top-[44px] right-2.5 z-10 flex flex-col gap-1.5">
          {/* Recenter button */}
          <button
            className="w-[34px] h-[34px] rounded-[8px] bg-[#F7B32B] flex items-center justify-center"
            style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}
          >
            <svg className="w-4 h-4 text-[#1B365D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
            </svg>
          </button>
          {/* 2D/3D Toggle */}
          <button
            onClick={() => setIs3D(!is3D)}
            className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center ${
              is3D
                ? 'bg-[#F7B32B]'
                : 'bg-white'
            }`}
            style={{
              boxShadow: is3D ? '0 2px 6px rgba(247,179,43,0.4)' : '0 1px 3px rgba(0,0,0,0.1)',
              border: is3D ? '2px solid transparent' : 'none',
            }}
          >
            <span className={`text-[10px] font-bold ${is3D ? 'text-[#1B365D]' : 'text-[#6B7280]'}`}>
              {is3D ? '3D' : '2D'}
            </span>
          </button>
          {/* Trails Toggle */}
          <button
            onClick={() => setShowTrails(!showTrails)}
            className={`w-[34px] h-[34px] rounded-[8px] flex items-center justify-center ${
              showTrails ? 'bg-[#F7B32B]' : 'bg-white'
            }`}
            style={{ boxShadow: showTrails ? '0 2px 4px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <svg className={`w-4 h-4 ${showTrails ? 'text-[#1B365D]' : 'text-[#6B7280]'}`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7"/>
            </svg>
          </button>
        </div>

        {/* Bottom-right floating buttons — Community + AR */}
        <div className="absolute right-3 z-10 flex flex-col gap-2.5 items-end" style={{ bottom: 68 }}>
          {/* Community button — circle */}
          <button
            className="w-[36px] h-[36px] rounded-full bg-[#F7B32B] flex items-center justify-center"
            style={{ boxShadow: '0 3px 6px rgba(247,179,43,0.3)' }}
          >
            <svg className="w-4 h-4 text-[#1B365D]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </button>
          {/* AR Button — 56pt circle, camera.viewfinder icon */}
          <button
            onClick={onAROpen}
            className="w-[44px] h-[44px] rounded-full bg-[#F7B32B] flex items-center justify-center hover:scale-105 transition-transform"
            style={{ boxShadow: '0 4px 8px rgba(247,179,43,0.4)' }}
            data-tour="ar-button"
          >
            <svg className="w-5 h-5 text-[#1B365D]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {/* camera.viewfinder - viewfinder bracket corners */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5M20.25 16.5V18A2.25 2.25 0 0118 20.25h-1.5M3.75 16.5V18A2.25 2.25 0 006 20.25h1.5" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
