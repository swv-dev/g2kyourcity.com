'use client'

import { useState, useMemo } from 'react'
import { Place, Category } from '../types'
import CategoryPill from '../shared/CategoryPill'
import PlaceCard from '../shared/PlaceCard'
import SimNavBar from '../shared/SimNavBar'

interface PlacesScreenProps {
  places: Place[]
  categories: Category[]
  onPlaceSelect: (place: Place) => void
}

export default function PlacesScreen({ places, categories, onPlaceSelect }: PlacesScreenProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))

  const filtered = useMemo(() => {
    let result = places
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q)
      )
    }
    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory)
    }
    return result
  }, [places, search, activeCategory])

  // Group by category
  const grouped = filtered.reduce<Record<string, { cat: Category | undefined; places: Place[] }>>((acc, place) => {
    const cat = categoryMap[place.category]
    const key = cat?.name || place.category
    if (!acc[key]) acc[key] = { cat, places: [] }
    acc[key].places.push(place)
    return acc
  }, {})

  return (
    <div className="h-full flex flex-col">
      <SimNavBar title="Places" />
      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide bg-[#F8F9FA]">
        {/* Search bar — matches iOS searchable */}
        <div className="px-3 pt-2 pb-1 bg-white">
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search places..."
              className="w-full bg-[#F8F9FA] rounded-lg pl-7 pr-3 py-1.5 text-[10px] text-[#1A1A1A] placeholder-[#9CA3AF] outline-none focus:ring-1 focus:ring-[#F7B32B]/40"
            />
          </div>
        </div>

        {/* Category filter bar — matches iOS */}
        <div className="px-3 py-2 bg-white border-b border-[#F3F4F6]">
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

        {/* Grouped place list — pinned section headers like iOS */}
        <div className="px-3 pt-2">
          {activeCategory ? (
            // Flat list when category filter is active
            <div className="flex flex-col gap-1.5">
              {filtered.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  category={categoryMap[place.category]}
                  onClick={() => onPlaceSelect(place)}
                  variant="compact"
                />
              ))}
            </div>
          ) : (
            // Grouped by category
            Object.entries(grouped).map(([catName, { cat, places: catPlaces }]) => (
              <div key={catName} className="mb-3">
                {/* Category header — matches iOS pinned section */}
                <div className="flex items-center gap-2 mb-1.5 sticky top-0 bg-[#F8F9FA] py-1.5 z-[1]">
                  {cat && <span className="text-[10px]">{cat.emoji}</span>}
                  <span className="text-[11px] font-semibold text-[#1A1A1A]">{catName}</span>
                  <span className="text-[8px] text-[#9CA3AF] bg-white rounded-full px-1.5 py-0.5">{catPlaces.length}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {catPlaces.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      category={cat}
                      onClick={() => onPlaceSelect(place)}
                      variant="compact"
                    />
                  ))}
                </div>
              </div>
            ))
          )}
          {filtered.length === 0 && (
            <div className="text-center py-8">
              <span className="text-3xl">📍</span>
              <p className="text-[11px] font-semibold text-[#1A1A1A] mt-2">No Places Found</p>
              <p className="text-[9px] text-[#6B7280] mt-0.5">Try a different search term.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory(null) }}
                className="mt-2 bg-[#F7B32B] text-white text-[10px] font-semibold px-4 py-1.5 rounded-full active:scale-[0.97] transition-transform"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
