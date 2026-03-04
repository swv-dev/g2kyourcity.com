'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

interface DateRangePickerProps {
  from: string
  to: string
}

const PRESETS = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 },
]

function daysAgo(n: number): string {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]
}

export default function DateRangePicker({ from, to }: DateRangePickerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [localFrom, setLocalFrom] = useState(from)
  const [localTo, setLocalTo] = useState(to)

  function applyRange(f: string, t: string) {
    const params = new URLSearchParams({ from: f, to: t })
    router.push(`${pathname}?${params.toString()}`)
  }

  function handlePreset(days: number) {
    const f = daysAgo(days)
    const t = new Date().toISOString().split('T')[0]
    setLocalFrom(f)
    setLocalTo(t)
    applyRange(f, t)
  }

  function handleCustomApply() {
    if (localFrom && localTo && localFrom <= localTo) {
      applyRange(localFrom, localTo)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((preset) => {
        const presetFrom = daysAgo(preset.days)
        const isActive = from === presetFrom
        return (
          <button
            key={preset.days}
            onClick={() => handlePreset(preset.days)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors border ${
              isActive
                ? 'bg-navy text-white border-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
          >
            {preset.label}
          </button>
        )
      })}

      <div className="flex items-center gap-1.5">
        <input
          type="date"
          value={localFrom}
          max={localTo}
          onChange={(e) => setLocalFrom(e.target.value)}
          className="text-xs px-2 py-1.5 rounded border border-gray-200 text-gray-600 bg-white"
        />
        <span className="text-xs text-gray-400">to</span>
        <input
          type="date"
          value={localTo}
          min={localFrom}
          max={new Date().toISOString().split('T')[0]}
          onChange={(e) => setLocalTo(e.target.value)}
          className="text-xs px-2 py-1.5 rounded border border-gray-200 text-gray-600 bg-white"
        />
        <button
          onClick={handleCustomApply}
          className="text-xs px-3 py-1.5 rounded font-medium transition-colors bg-gold text-navy hover:bg-gold-dark"
        >
          Apply
        </button>
      </div>
    </div>
  )
}
