'use client'

import { Event, Category } from '../types'

interface EventCardProps {
  event: Event
  category?: Category
  onClick?: () => void
  variant?: 'standard' | 'compact' | 'featured'
}

export default function EventCard({ event, category, onClick, variant = 'standard' }: EventCardProps) {
  const d = new Date(event.date + 'T00:00:00')
  const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = d.getDate()
  const dateRange = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-3 bg-white rounded-xl p-3 text-left w-full active:scale-[0.97] active:opacity-90 transition-all duration-150"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
      >
        {/* Date badge — 48pt */}
        <div className="flex-shrink-0 w-[38px] h-[38px] bg-[#F8F9FA] rounded-lg flex flex-col items-center justify-center">
          <span className="text-[7px] font-bold text-[#F7B32B] leading-none">{month}</span>
          <span className="text-[14px] font-bold text-[#1A1A1A] leading-tight">{day}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-1">{event.title}</p>
          <p className="text-[9px] text-[#6B7280] line-clamp-1">{event.time}</p>
        </div>
        <svg className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
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
        {/* Image area with gradient */}
        <div
          className="h-[110px] relative"
          style={{
            background: `linear-gradient(135deg, ${category?.colorHex || '#3B82F6'}60, ${category?.colorHex || '#1B365D'}60)`,
          }}
        >
          <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">{category?.emoji || '📅'}</span>
          {/* Date badge overlay — top left */}
          <div className="absolute top-2 left-2 w-[38px] h-[38px] bg-white/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center">
            <span className="text-[7px] font-bold text-[#F7B32B] leading-none">{month}</span>
            <span className="text-[14px] font-bold text-[#1A1A1A] leading-tight">{day}</span>
          </div>
        </div>
        <div className="p-3">
          <p className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">{event.title}</p>
          <p className="text-[9px] text-[#6B7280] mt-0.5">{dateRange} &middot; {event.time}</p>
          <div className="flex items-center justify-between mt-2">
            {category && (
              <span
                className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium"
                style={{ backgroundColor: `${category.colorHex}1F`, color: category.colorHex }}
              >
                {category.emoji} {category.name}
              </span>
            )}
            {event.isFree ? (
              <span className="text-[8px] font-medium text-[#22C55E] bg-[#22C55E1F] rounded-full px-1.5 py-0.5">Free</span>
            ) : (
              <span className="text-[8px] text-[#1A1A1A] bg-[#F8F9FA] rounded-full px-1.5 py-0.5">{event.price}</span>
            )}
          </div>
        </div>
      </button>
    )
  }

  // Standard — used in This Week horizontal scroll (280pt → ~220px)
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[220px] bg-white rounded-xl overflow-hidden text-left active:scale-[0.97] active:opacity-90 transition-all duration-150"
      style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="p-3">
        <div className="flex items-start gap-2.5">
          {/* Date badge — 56pt → ~44px */}
          <div className="flex-shrink-0 w-[44px] h-[44px] bg-[#F8F9FA] rounded-lg flex flex-col items-center justify-center">
            <span className="text-[8px] font-bold text-[#F7B32B] leading-none">{month}</span>
            <span className="text-[18px] font-bold text-[#1A1A1A] leading-tight">{day}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">{event.title}</p>
            <p className="text-[9px] text-[#6B7280] mt-0.5">{dateRange} &middot; {event.time}</p>
            <p className="text-[8px] text-[#9CA3AF] mt-0.5 line-clamp-1 flex items-center gap-0.5">
              <svg className="w-2 h-2 inline flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
              {event.location}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3F4F6]">
          {category && (
            <span
              className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium"
              style={{ backgroundColor: `${category.colorHex}1F`, color: category.colorHex }}
            >
              {category.emoji} {category.name}
            </span>
          )}
          {event.isFree ? (
            <span className="text-[8px] font-medium text-[#22C55E]">Free</span>
          ) : (
            <span className="text-[8px] text-[#1A1A1A]">{event.price}</span>
          )}
        </div>
      </div>
    </button>
  )
}
