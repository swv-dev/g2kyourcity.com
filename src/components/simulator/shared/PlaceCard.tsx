'use client'

import { Place, Category } from '../types'
import StarRating from './StarRating'

interface PlaceCardProps {
  place: Place
  category?: Category
  onClick?: () => void
  variant?: 'standard' | 'compact' | 'featured'
}

export default function PlaceCard({ place, category, onClick, variant = 'standard' }: PlaceCardProps) {
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 bg-white rounded-xl p-3 text-left w-full active:scale-[0.97] active:opacity-90 transition-all duration-150"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
      >
        {/* 60pt thumbnail */}
        <div
          className="w-[48px] h-[48px] rounded-lg flex items-center justify-center text-lg flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${category?.colorHex || '#F7B32B'}30, ${category?.colorHex || '#1B365D'}20)`,
          }}
        >
          {category?.emoji || '📍'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-1">{place.name}</p>
          {category && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium mt-0.5"
              style={{ backgroundColor: `${category.colorHex}1F`, color: category.colorHex }}
            >
              {category.name}
            </span>
          )}
        </div>
        <div className="flex-shrink-0 flex items-center gap-1">
          <StarRating rating={place.rating} />
          <svg className="w-3 h-3 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </button>
    )
  }

  if (variant === 'featured') {
    return (
      <button
        onClick={onClick}
        className="w-full bg-white rounded-[16px] overflow-hidden text-left active:scale-[0.97] active:opacity-90 transition-all duration-150"
        style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}
      >
        {/* Image with gradient overlay */}
        <div
          className="h-[120px] relative"
          style={{
            background: `linear-gradient(135deg, ${category?.colorHex || '#F7B32B'}4D, ${category?.colorHex || '#1B365D'}4D)`,
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">{category?.emoji || '📍'}</span>
          {/* Gradient text overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-[80px]" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }} />
          <div className="absolute bottom-0 left-0 p-3">
            {category && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium mb-1"
                style={{ backgroundColor: `${category.colorHex}1F`, color: 'white' }}
              >
                {category.emoji} {category.name}
              </span>
            )}
            <p className="text-[14px] font-bold text-white leading-tight">{place.name}</p>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[9px] text-[#6B7280] line-clamp-2 leading-relaxed">{place.shortDescription || place.description}</p>
          <div className="flex items-center justify-between mt-1.5">
            <StarRating rating={place.rating} size="md" />
          </div>
        </div>
      </button>
    )
  }

  // Standard card — 240pt in iOS → ~190px in simulator
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[190px] bg-white rounded-xl overflow-hidden text-left active:scale-[0.97] active:opacity-90 transition-all duration-150"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
    >
      {/* Image placeholder — 120pt → ~96px */}
      <div
        className="h-[80px] flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${category?.colorHex || '#F7B32B'}4D, ${category?.colorHex || '#1B365D'}4D)`,
        }}
      >
        <span className="text-2xl opacity-50">{category?.emoji || '📍'}</span>
      </div>
      <div className="p-2.5">
        <p className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">{place.name}</p>
        <p className="text-[9px] text-[#6B7280] line-clamp-2 mt-0.5 leading-relaxed">{place.shortDescription || place.description}</p>
        <div className="flex items-center justify-between mt-1.5">
          {category && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium"
              style={{ backgroundColor: `${category.colorHex}1F`, color: category.colorHex }}
            >
              {category.emoji} {category.name}
            </span>
          )}
          <StarRating rating={place.rating} />
        </div>
      </div>
    </button>
  )
}
