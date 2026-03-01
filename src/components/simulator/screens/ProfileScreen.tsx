'use client'

import { useState, useEffect } from 'react'
import { Badge, ExplorerLevel } from '../types'
import SimNavBar from '../shared/SimNavBar'
import SectionHeader from '../shared/SectionHeader'

interface ProfileScreenProps {
  badges: Badge[]
  levels: ExplorerLevel[]
}

export default function ProfileScreen({ badges, levels }: ProfileScreenProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const targetScore = 320

  const currentLevel = levels.find(l => targetScore >= l.minScore && targetScore <= l.maxScore) || levels[0]
  const nextLevel = levels.find(l => l.level === currentLevel.level + 1)
  const pointsToNext = nextLevel ? nextLevel.minScore - targetScore : 0
  const maxScore = currentLevel.maxScore

  // Animate score on mount
  useEffect(() => {
    setAnimatedScore(0)
    const duration = 1200
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedScore(Math.round(eased * targetScore))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [])

  // Score ring — 140pt iOS → ~110px sim
  const ringSize = 110
  const strokeWidth = 10
  const radius = (ringSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const scorePercent = animatedScore / maxScore
  const strokeDashoffset = circumference - scorePercent * circumference

  const earnedBadges = badges.filter(b => b.earned)
  const lockedBadges = badges.filter(b => !b.earned)

  // Simulated recent activities
  const activities = [
    { icon: '📍', title: 'Checked in at Sadie\'s Coffee', time: '2 hours ago', points: 25 },
    { icon: '🏆', title: 'Earned Downtown Discoverer badge', time: '3 hours ago', points: 50 },
    { icon: '📍', title: 'Checked in at Fox Pond Park', time: 'Yesterday', points: 25 },
  ]

  return (
    <div className="h-full flex flex-col">
      <SimNavBar title="Profile" />
      <div className="flex-1 overflow-y-auto pb-16 scrollbar-hide bg-[#F8F9FA]" data-tour="score-ring">
        {/* User Profile Card — matches iOS: 100pt avatar */}
        <div className="mx-3 mt-3 bg-white rounded-[16px] p-4 text-center" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}>
          {/* Avatar — gradient circle + person icon */}
          <div className="w-[64px] h-[64px] rounded-full mx-auto flex items-center justify-center relative"
            style={{ background: 'linear-gradient(135deg, #F7B32B, #1B365D)' }}>
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            {/* Camera badge — 32pt circle */}
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#F7B32B] flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15.2c1.77 0 3.2-1.43 3.2-3.2S13.77 8.8 12 8.8 8.8 10.23 8.8 12s1.43 3.2 3.2 3.2zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
              </svg>
            </div>
          </div>
          <p className="text-[14px] font-bold text-[#1A1A1A] mt-2">Stephen</p>
          <p className="text-[9px] text-[#9CA3AF]">Your profile photo appears on the map</p>
        </div>

        {/* Friends row — matches iOS */}
        <div className="mx-3 mt-2.5">
          <button className="w-full flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 active:scale-[0.97] active:opacity-90 transition-all duration-150" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <svg className="w-4 h-4 text-[#F7B32B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            <span className="text-[11px] text-[#1A1A1A] flex-1 text-left">Friends</span>
            <svg className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Explorer Score Card — matches iOS: 140pt ring, 48pt score, explorerGradient */}
        <div className="mx-3 mt-2.5 bg-white rounded-[16px] p-4" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}>
          {/* Score Ring */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: ringSize, height: ringSize }}>
              <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${ringSize} ${ringSize}`}>
                <circle cx={ringSize/2} cy={ringSize/2} r={radius} fill="none" stroke="#F8F9FA" strokeWidth={strokeWidth} />
                <circle
                  cx={ringSize/2} cy={ringSize/2} r={radius}
                  fill="none"
                  stroke="url(#explorerGradient)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="explorerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F7B32B" />
                    <stop offset="100%" stopColor="#F97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[28px] font-bold text-[#1A1A1A]" style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'ui-monospace, monospace' }}>{animatedScore}</span>
                <span className="text-[8px] text-[#9CA3AF]">points</span>
              </div>
            </div>
          </div>

          {/* Level badge — with level color */}
          <div className="text-center mt-2">
            <div className="inline-flex items-center gap-1">
              <span>{currentLevel.emoji}</span>
              <span className="text-[12px] font-semibold text-[#1A1A1A]">{currentLevel.name}</span>
            </div>
            {nextLevel && (
              <p className="text-[8px] text-[#9CA3AF] mt-0.5">{pointsToNext} points to {nextLevel.name}</p>
            )}
          </div>

          {/* Stats row — matches iOS: 4 columns */}
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-[#F3F4F6]">
            {[
              { value: '23', label: 'Check-ins' },
              { value: `${earnedBadges.length}`, label: 'Badges' },
              { value: '7', label: 'Day Streak' },
              { value: '4.2', label: 'Miles' },
            ].map((stat) => (
              <div key={stat.label} className="text-center flex-1">
                <p className="text-[15px] font-bold text-[#1A1A1A]">{stat.value}</p>
                <p className="text-[7px] text-[#9CA3AF]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Streets Discovered Card — matches iOS */}
        <div className="mx-3 mt-2.5 bg-white rounded-[16px] p-3" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-[#F7B32B]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 10.5c0 7.14 7 12.5 7 12.5S19 17.64 19 10.5c0-3.58-2.92-6.5-6.5-6.5h-1C7.92 4 5 6.92 5 10.5zm9.5 0c0 1.38-1.12 2.5-2.5 2.5s-2.5-1.12-2.5-2.5S10.62 8 12 8s2.5 1.12 2.5 2.5z"/>
            </svg>
            <span className="text-[11px] font-semibold text-[#1A1A1A] flex-1">Streets Discovered</span>
            <span className="text-[9px] text-[#6B7280]">12/47</span>
          </div>
          {/* Overall progress bar */}
          <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#F7B32B] rounded-full" style={{ width: '25.5%' }} />
          </div>
          {/* Per-neighborhood */}
          {[
            { name: 'Downtown', discovered: 8, total: 15 },
            { name: 'Kerr Lake', discovered: 3, total: 12 },
            { name: 'North Henderson', discovered: 1, total: 20 },
          ].map((n) => (
            <div key={n.name} className="flex items-center gap-2 mt-1.5">
              <span className="text-[8px] text-[#6B7280] w-[70px] flex-shrink-0">{n.name}</span>
              <div className="flex-1 h-1 bg-[#F3F4F6] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(n.discovered / n.total) * 100}%`,
                    backgroundColor: n.discovered === n.total ? '#22C55E' : '#F7B32B',
                    opacity: 0.7,
                  }}
                />
              </div>
              <span className="text-[7px] text-[#9CA3AF] w-[24px] text-right flex-shrink-0">{n.discovered}/{n.total}</span>
            </div>
          ))}
        </div>

        {/* Recent Activity — matches iOS */}
        <div className="mt-4">
          <SectionHeader title="Recent Activity" />
          <div className="flex flex-col gap-1.5 px-3">
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-2.5 bg-white rounded-lg p-2.5" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
                {/* Icon circle */}
                <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#F7B32B1F' }}>
                  <span className="text-[12px]">{activity.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] text-[#1A1A1A] line-clamp-1">{activity.title}</p>
                  <p className="text-[7px] text-[#9CA3AF]">{activity.time}</p>
                </div>
                <span className="text-[9px] font-semibold text-[#22C55E] flex-shrink-0">+{activity.points}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Grid — matches iOS: 3 columns with badge colors */}
        <div className="mt-4">
          <SectionHeader title="Badges" subtitle="Collect them all!" />
          <div className="grid grid-cols-3 gap-3 px-3">
            {earnedBadges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center text-center">
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${badge.colorHex}20` }}>
                  {badge.emoji}
                </div>
                <p className="text-[8px] font-medium text-[#1A1A1A] mt-1 line-clamp-2 leading-tight">{badge.name}</p>
              </div>
            ))}
            {lockedBadges.map((badge) => (
              <div key={badge.id} className="flex flex-col items-center text-center opacity-60">
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center relative"
                  style={{ backgroundColor: '#F8F9FA' }}>
                  <span className="text-xl grayscale">{badge.emoji}</span>
                  {/* Progress ring in badge color */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="22" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                    <circle cx="24" cy="24" r="22" fill="none" stroke={badge.colorHex} strokeWidth="2.5" strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 22}`}
                      strokeDashoffset={`${2 * Math.PI * 22 * 0.7}`}
                      opacity={0.5}
                    />
                  </svg>
                </div>
                <p className="text-[8px] font-medium text-[#9CA3AF] mt-1 line-clamp-2 leading-tight">{badge.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Settings — matches iOS */}
        <div className="mt-4 pb-4">
          <SectionHeader title="Settings" />
          <div className="mx-3 bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {[
              { icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z', label: 'About G2K Henderson' },
              { icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', label: 'Contact Us' },
              { icon: 'M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z', label: 'Reset Onboarding' },
              { icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z', label: 'Developer Access' },
            ].map((item, i) => (
              <div key={i}>
                {i > 0 && <div className="h-px bg-[#F3F4F6] ml-[40px]" />}
                <button className="w-full flex items-center gap-3 px-3 py-2.5 active:bg-[#F8F9FA] transition-colors">
                  <svg className="w-4 h-4 text-[#F7B32B] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                  <span className="text-[11px] text-[#1A1A1A] flex-1 text-left">{item.label}</span>
                  <svg className="w-3 h-3 text-[#9CA3AF] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
