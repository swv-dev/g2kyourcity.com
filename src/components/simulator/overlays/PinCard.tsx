'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Place, Category } from '../types'
import StarRating from '../shared/StarRating'

interface PinCardProps {
  place: Place
  category?: Category
  onClose: () => void
}

export default function PinCard({ place, category, onClose }: PinCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Simulated social proof
  const visitCount = Math.floor(Math.random() * 30) + 5
  const isTrending = place.rating >= 4.5

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="absolute bottom-[52px] left-0 right-0 z-10 bg-white rounded-t-[20px]"
      style={{ boxShadow: '0 -8px 16px rgba(0,0,0,0.12)' }}
    >
      {/* Handle — 36x4pt */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-9 h-1 bg-[#9CA3AF] rounded-full" />
      </div>

      <div className="px-3 pb-3">
        {/* Title row: name + category + favorite + dismiss */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-semibold text-[#1A1A1A] leading-tight">{place.name}</h3>
            {category && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium mt-1"
                style={{ backgroundColor: `${category.colorHex}1F`, color: category.colorHex }}
              >
                {category.emoji} {category.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {/* Favorite button */}
            <button onClick={() => setIsFavorite(!isFavorite)} className="p-0.5">
              <svg className="w-[18px] h-[18px]" fill={isFavorite ? '#F7B32B' : 'none'} stroke={isFavorite ? '#F7B32B' : '#9CA3AF'} strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
            {/* Dismiss button */}
            <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#6B7280] p-0.5">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Social proof row */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[8px] text-[#9CA3AF] flex items-center gap-0.5">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            {visitCount} explorers visited
          </span>
          {isTrending && (
            <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium bg-[#F973161F] text-[#F97316]">
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67z"/>
              </svg>
              Trending!
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[9px] text-[#6B7280] mt-1.5 leading-relaxed line-clamp-2">{place.shortDescription || place.description}</p>

        {/* Info row: rating + address */}
        <div className="flex items-center gap-3 mt-2">
          <StarRating rating={place.rating} size="md" />
          <span className="text-[8px] text-[#9CA3AF] flex items-center gap-0.5 line-clamp-1 flex-1 min-w-0">
            <svg className="w-2 h-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
            <span className="truncate">{place.address}</span>
          </span>
        </div>

        {/* Action pills — horizontal scroll, matches iOS */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {/* Check In pill */}
          <button className="inline-flex items-center gap-1 flex-shrink-0 text-[#1B365D] text-[9px] font-medium py-1.5 px-3 rounded-full bg-[#F7B32B]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Check In
          </button>
          {/* Details pill */}
          <button className="flex-shrink-0 text-[#F7B32B] text-[9px] font-medium py-1.5 px-3 rounded-full"
            style={{ backgroundColor: '#F7B32B1F' }}>
            Details
          </button>
          {/* Directions pill */}
          <button className="inline-flex items-center gap-1 flex-shrink-0 bg-[#F7B32B] text-white text-[9px] font-medium py-1.5 px-3 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
            </svg>
            Directions
          </button>
        </div>
      </div>
    </motion.div>
  )
}
