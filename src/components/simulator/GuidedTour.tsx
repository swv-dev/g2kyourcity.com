'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TourStep } from './types'

interface GuidedTourProps {
  steps: TourStep[]
  currentStep: number
  onNext: () => void
  onSkip: () => void
}

export default function GuidedTour({ steps, currentStep, onNext, onSkip }: GuidedTourProps) {
  const step = steps[currentStep]
  if (!step) return null

  const isLast = currentStep === steps.length - 1

  return (
    <>
      {/* Semi-transparent scrim so tour is always visible over map/content */}
      <div className="absolute inset-0 z-[998] bg-black/20 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute top-2 left-3 right-3 z-[999]"
        >
          <div className="bg-white rounded-2xl shadow-xl p-3 relative" style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
            <p className="text-[12px] font-bold text-[#1B365D]">{step.title}</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5 leading-relaxed">{step.description}</p>

            {/* Progress dots + actions */}
            <div className="flex items-center justify-between mt-3">
              {/* Progress dots */}
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === currentStep ? 'bg-[#F7B32B]' : i < currentStep ? 'bg-[#1B365D]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={onSkip}
                  className="text-[9px] text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  Skip tour
                </button>
                <button
                  onClick={onNext}
                  className="bg-[#F7B32B] text-white text-[10px] font-semibold px-4 py-1.5 rounded-full hover:bg-[#E5A025] transition-colors"
                >
                  {isLast ? 'Explore!' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
