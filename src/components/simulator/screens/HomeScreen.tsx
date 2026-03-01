'use client'

import { useState } from 'react'
import { Place, Category, Event, Experience } from '../types'
import CategoryPill from '../shared/CategoryPill'
import PlaceCard from '../shared/PlaceCard'
import EventCard from '../shared/EventCard'
import HorizontalScroll from '../shared/HorizontalScroll'
import SimNavBar from '../shared/SimNavBar'
import SectionHeader from '../shared/SectionHeader'

interface HomeScreenProps {
  places: Place[]
  categories: Category[]
  events: Event[]
  experiences: Experience[]
  onPlaceSelect: (place: Place) => void
}

export default function HomeScreen({ places, categories, events, experiences, onPlaceSelect }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))

  // Featured event — first upcoming event
  const featuredEvent = events[0]
  const featuredEventCat = featuredEvent ? categoryMap[featuredEvent.category] : undefined

  // This Week events — filtered by category, max 5
  const thisWeekEvents = (selectedCategory
    ? events.filter(e => e.category === selectedCategory)
    : events
  ).slice(0, 5)

  // Featured places — filter by isFeatured flag, then by rating
  const featuredPlaces = (selectedCategory
    ? places.filter(p => p.category === selectedCategory)
    : places.filter(p => p.isFeatured)
  ).slice(0, 8)
  // Fallback if no featured flags
  const displayPlaces = featuredPlaces.length > 0
    ? featuredPlaces
    : places.filter(p => p.rating >= 4.5).slice(0, 8)

  return (
    <div className="h-full flex flex-col">
      <SimNavBar title="G2K Henderson" />
      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide bg-[#F8F9FA]">
        {/* Hero card — matches iOS: navy gradient, decorative yellow circles, 20pt xl radius */}
        <div className="mx-3 mt-3 rounded-[16px] overflow-hidden relative" style={{ height: 140 }} data-tour="hero-card">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1B365D 0%, rgba(27,54,93,0.8) 100%)' }}
          />
          {/* Decorative circles — matches iOS 200pt + 120pt */}
          <div className="absolute -top-8 -right-4 w-32 h-32 rounded-full bg-[#F7B32B] opacity-20" />
          <div className="absolute bottom-2 right-12 w-20 h-20 rounded-full bg-[#F7B32B] opacity-10" />
          <div className="relative p-4 flex flex-col justify-end h-full">
            <p className="text-[13px] font-semibold text-[#F7B32B]">Welcome to</p>
            <p className="text-[22px] font-bold text-white leading-tight">Henderson</p>
            <p className="text-[9px] text-white/80 mt-1 max-w-[200px] leading-relaxed">
              Discover local events, hidden gems, and earn rewards as you explore.
            </p>
          </div>
        </div>

        {/* Category pills — interactive with selected state */}
        <div className="mt-4 px-3">
          <HorizontalScroll>
            {categories.slice(0, 10).map((cat) => (
              <CategoryPill
                key={cat.id}
                name={cat.name}
                emoji={cat.emoji}
                colorHex={cat.colorHex}
                active={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              />
            ))}
          </HorizontalScroll>
        </div>

        {/* Featured Event — matches iOS: full-width featured EventCard */}
        {featuredEvent && (
          <div className="mt-5">
            <SectionHeader title="Featured Event" />
            <div className="px-3">
              <EventCard event={featuredEvent} category={featuredEventCat} variant="featured" />
            </div>
          </div>
        )}

        {/* This Week — horizontal event cards at 220px (280pt iOS) */}
        {thisWeekEvents.length > 0 && (
          <div className="mt-5">
            <SectionHeader title="This Week" subtitle={`${thisWeekEvents.length} events coming up`} seeAll />
            <div className="px-3">
              <HorizontalScroll>
                {thisWeekEvents.map((event) => (
                  <EventCard key={event.id} event={event} category={categoryMap[event.category]} variant="standard" />
                ))}
              </HorizontalScroll>
            </div>
          </div>
        )}

        {/* Featured Places — horizontal place cards at 190px (240pt iOS) */}
        {displayPlaces.length > 0 && (
          <div className="mt-5">
            <SectionHeader title="Featured Places" subtitle="Local favorites" seeAll />
            <div className="px-3">
              <HorizontalScroll>
                {displayPlaces.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    category={categoryMap[place.category]}
                    onClick={() => onPlaceSelect(place)}
                    variant="standard"
                  />
                ))}
              </HorizontalScroll>
            </div>
          </div>
        )}

        {/* Curated Experiences — matches iOS ExperienceCard: 56pt icon, meta row */}
        {experiences.length > 0 && (
          <div className="mt-5 pb-4">
            <SectionHeader title="Curated Experiences" subtitle="Ready-made adventures" />
            <div className="flex flex-col gap-2.5 px-3">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center gap-3 bg-white rounded-xl p-3 active:scale-[0.97] active:opacity-90 transition-all duration-150 cursor-pointer"
                  style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                >
                  {/* 56pt icon circle with warm gradient */}
                  <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #F7B32B, #F7B32B 70%)' }}>
                    <span className="text-[18px]">{exp.emoji}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-[#1A1A1A]">{exp.name}</p>
                    <p className="text-[9px] text-[#6B7280] line-clamp-2 leading-relaxed">{exp.description}</p>
                    {/* Meta row — clock + stops */}
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[8px] text-[#9CA3AF] flex items-center gap-0.5">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/></svg>
                        {exp.duration}
                      </span>
                      <span className="text-[8px] text-[#9CA3AF] flex items-center gap-0.5">
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                        {exp.stops.length} stops
                      </span>
                    </div>
                  </div>
                  <svg className="w-3.5 h-3.5 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
