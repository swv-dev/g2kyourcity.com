'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Event, Category } from '../types'
import SimNavBar from '../shared/SimNavBar'
import CategoryPill from '../shared/CategoryPill'

interface EventsScreenProps {
  events: Event[]
  categories: Category[]
}

export default function EventsScreen({ events, categories }: EventsScreenProps) {
  const [view, setView] = useState<'upcoming' | 'calendar'>('upcoming')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))

  // Generate 14-day calendar strip starting today
  const today = new Date()
  const calendarDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return d
  })

  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Filter by category
  let filteredEvents = activeCategory
    ? events.filter(e => e.category === activeCategory)
    : events

  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date))
  const displayEvents = selectedDate
    ? sortedEvents.filter(e => e.date === selectedDate)
    : sortedEvents

  // Group by date label
  const grouped = displayEvents.reduce<Record<string, Event[]>>((acc, event) => {
    const d = new Date(event.date + 'T00:00:00')
    const todayStr = today.toDateString()
    const tomorrowDate = new Date(today)
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    let key: string
    if (d.toDateString() === todayStr) {
      key = 'Today'
    } else if (d.toDateString() === tomorrowDate.toDateString()) {
      key = 'Tomorrow'
    } else {
      key = d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    }
    if (!acc[key]) acc[key] = []
    acc[key].push(event)
    return acc
  }, {})

  const eventDates = new Set(filteredEvents.map(e => e.date))

  return (
    <div className="h-full flex flex-col">
      {/* Nav bar with + button */}
      <div className="flex items-center justify-between px-3 py-2 bg-white/95 backdrop-blur-sm border-b border-[#F3F4F6]">
        <div className="w-7 h-7 flex-shrink-0">
          <Image src="/images/g2k_your_city_logo.png" alt="G2K" width={28} height={28} className="object-contain" />
        </div>
        <span className="text-[13px] font-semibold text-[#1B365D]">Events</span>
        {/* + button (decorative, matches iOS plus.circle.fill) */}
        <button className="w-7 h-7 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#F7B32B]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide bg-[#F8F9FA]">
        {/* Segmented picker — matches iOS .segmented */}
        <div className="px-3 pt-2 pb-1" data-tour="calendar-strip">
          <div className="flex bg-[#E5E7EB] rounded-lg p-0.5">
            <button
              onClick={() => { setView('upcoming'); setSelectedDate(null) }}
              className={`flex-1 text-[10px] font-medium py-1.5 rounded-md transition-all ${
                view === 'upcoming' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex-1 text-[10px] font-medium py-1.5 rounded-md transition-all ${
                view === 'calendar' ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-[#6B7280]'
              }`}
            >
              Calendar
            </button>
          </div>
        </div>

        {/* Category filter bar — matches iOS */}
        <div className="px-3 py-1.5 bg-white border-b border-[#F3F4F6]">
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveCategory(null)}
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium whitespace-nowrap transition-all ${
                !activeCategory ? 'bg-[#1B365D] text-white' : 'bg-white text-[#1A1A1A]'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
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

        {/* Calendar strip — matches iOS: 44pt wide, 72pt tall cells, rounded-xl */}
        {view === 'calendar' && (
          <div className="px-3 py-2">
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
              {calendarDays.map((day) => {
                const dateStr = day.toISOString().split('T')[0]
                const isSelected = selectedDate === dateStr
                const hasEvents = eventDates.has(dateStr)
                const isToday = day.toDateString() === today.toDateString()
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                    className={`flex-shrink-0 w-[36px] h-[58px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all ${
                      isSelected
                        ? 'bg-[#F7B32B] text-white'
                        : isToday
                        ? 'bg-white text-[#1A1A1A]'
                        : 'text-[#6B7280]'
                    }`}
                    style={!isSelected && isToday ? { boxShadow: '0 1px 3px rgba(0,0,0,0.08)' } : undefined}
                  >
                    <span className={`text-[8px] font-medium uppercase ${isSelected ? 'text-white/80' : 'text-[#9CA3AF]'}`}>
                      {day.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className={`text-[15px] ${isSelected ? 'font-bold' : 'font-semibold'}`}>{day.getDate()}</span>
                    {hasEvents && (
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[#F7B32B]'}`} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Events list — grouped by date with pinned headers */}
        <div className="px-3 pt-1">
          {Object.entries(grouped).map(([dateLabel, dateEvents]) => (
            <div key={dateLabel} className="mb-4">
              {/* Date header — matches iOS pinned section header */}
              <div className="flex items-center gap-2 mb-2 sticky top-0 bg-[#F8F9FA] py-1.5 z-[1]">
                <span className="text-[11px] font-semibold text-[#1A1A1A]">{dateLabel}</span>
                <span className="text-[8px] text-[#9CA3AF] bg-white rounded-full px-1.5 py-0.5">
                  {dateEvents.length} event{dateEvents.length !== 1 ? 's' : ''}
                </span>
              </div>
              {/* Event cards — standard style, full width */}
              <div className="flex flex-col gap-2">
                {dateEvents.map((event) => {
                  const d = new Date(event.date + 'T00:00:00')
                  const cat = categoryMap[event.category]
                  const dateRange = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                  return (
                    <div key={event.id} className="bg-white rounded-xl p-3 active:scale-[0.97] active:opacity-90 transition-all duration-150" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                      <div className="flex items-start gap-2.5">
                        {/* Date badge — 56pt → ~44px */}
                        <div className="flex-shrink-0 w-[44px] h-[44px] bg-[#F8F9FA] rounded-lg flex flex-col items-center justify-center">
                          <span className="text-[8px] font-bold text-[#F7B32B] leading-none">
                            {d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                          </span>
                          <span className="text-[18px] font-bold text-[#1A1A1A] leading-tight">{d.getDate()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-[#1A1A1A] line-clamp-2 leading-tight">{event.title}</p>
                          <p className="text-[9px] text-[#6B7280] mt-0.5">{dateRange} &middot; {event.time}</p>
                          <p className="text-[8px] text-[#9CA3AF] mt-0.5 flex items-center gap-0.5">
                            <svg className="w-2 h-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                            </svg>
                            {event.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F3F4F6]">
                        {cat && (
                          <span
                            className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[7px] font-medium"
                            style={{ backgroundColor: `${cat.colorHex}1F`, color: cat.colorHex }}
                          >
                            {cat.emoji} {cat.name}
                          </span>
                        )}
                        {event.isFree ? (
                          <span className="text-[8px] font-medium text-[#22C55E]">Free</span>
                        ) : (
                          <span className="text-[8px] text-[#1A1A1A]">{event.price}</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          {displayEvents.length === 0 && (
            <div className="text-center py-8">
              <span className="text-3xl">📅</span>
              <p className="text-[11px] font-semibold text-[#1A1A1A] mt-2">
                {selectedDate ? 'No Events This Day' : 'No Upcoming Events'}
              </p>
              <p className="text-[9px] text-[#6B7280] mt-0.5">Check back soon for new events!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
