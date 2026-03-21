'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { Reward } from '../types'

interface ARSpinOverlayProps {
  rewards: Reward[]
  onClose: () => void
}

export default function ARSpinOverlay({ rewards, onClose }: ARSpinOverlayProps) {
  const [phase, setPhase] = useState<'idle' | 'spinning' | 'reveal'>('idle')
  const [wonReward, setWonReward] = useState<Reward | null>(null)
  const rotation = useMotionValue(0)
  const scale = useTransform(rotation, [0, 360], [1, 1]) // keeps scale stable
  const isDragging = useRef(false)
  const lastAngle = useRef(0)
  const velocity = useRef(0)

  const pickReward = useCallback(() => {
    const weighted = rewards.flatMap(r => {
      const count = r.rarity === 'common' ? 4 : r.rarity === 'uncommon' ? 2 : r.rarity === 'rare' ? 1 : 0.5
      return Array(Math.ceil(count)).fill(r)
    })
    return weighted[Math.floor(Math.random() * weighted.length)]
  }, [rewards])

  const handleDragStart = () => {
    if (phase === 'reveal') return
    isDragging.current = true
    lastAngle.current = rotation.get()
    velocity.current = 0
  }

  const handleDrag = (_: unknown, info: { delta: { x: number } }) => {
    if (!isDragging.current) return
    const delta = info.delta.x * 1.5
    velocity.current = delta
    rotation.set(rotation.get() + delta)
  }

  const handleDragEnd = () => {
    isDragging.current = false
    const v = Math.abs(velocity.current)
    if (v < 3) return // Not enough velocity

    setPhase('spinning')
    const currentRot = rotation.get()
    const extraSpins = 720 + v * 30 // More velocity = more spins
    const target = currentRot + (velocity.current > 0 ? extraSpins : -extraSpins)

    animate(rotation, target, {
      type: 'tween',
      duration: 2 + v * 0.05,
      ease: [0.2, 0.8, 0.3, 1], // Custom deceleration curve
      onComplete: () => {
        setPhase('reveal')
        setWonReward(pickReward())
      },
    })
  }

  // Sparkle positions for orbit
  const sparkles = Array.from({ length: 6 }, (_, i) => ({
    angle: (360 / 6) * i,
    delay: i * 0.15,
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-14 right-3 text-white/70 hover:text-white z-40"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title */}
      <p className="text-white text-[13px] font-bold mb-1">
        {phase === 'reveal' ? '🎉 You Won!' : '🎰 Spin to Win!'}
      </p>
      <p className="text-white/60 text-[9px] mb-6">
        {phase === 'idle' && 'Drag the emblem to spin'}
        {phase === 'spinning' && 'Spinning...'}
        {phase === 'reveal' && 'Tap anywhere to continue'}
      </p>

      {/* Emblem container */}
      <div className="relative w-40 h-40">
        {/* Sparkle orbit */}
        <div className="absolute inset-0 animate-orbit">
          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#F7B32B] rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${s.angle}deg) translateY(-70px)`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                delay: s.delay,
              }}
            />
          ))}
        </div>

        {/* Gold emblem */}
        <motion.div
          style={{ rotate: rotation, scale }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="w-32 h-32 mx-auto mt-4 cursor-grab active:cursor-grabbing"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F7B32B] via-[#FFD700] to-[#B8860B] shadow-lg shadow-yellow-500/30 flex items-center justify-center border-4 border-[#DAA520] animate-glow-pulse">
            <div className="w-24 h-24 rounded-full border-2 border-[#DAA520]/40 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl">⭐</span>
                <p className="text-[8px] font-bold text-[#7C4A00] mt-0.5">G2K&trade;</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reward reveal */}
      {phase === 'reveal' && wonReward && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="mt-6 bg-white rounded-xl p-4 mx-6 text-center shadow-xl"
          onClick={onClose}
        >
          <span className="text-3xl">{wonReward.emoji}</span>
          <p className="text-[12px] font-bold text-gray-900 mt-1">{wonReward.text}</p>
          <p className="text-[9px] text-gray-500 mt-0.5 capitalize">
            {wonReward.rarity === 'legendary' ? '✨ Legendary!' : wonReward.rarity === 'rare' ? '💎 Rare!' : ''}
          </p>
          <button className="mt-3 bg-[#F7B32B] text-[#1B365D] text-[10px] font-bold px-6 py-1.5 rounded-lg">
            Claim Reward
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
