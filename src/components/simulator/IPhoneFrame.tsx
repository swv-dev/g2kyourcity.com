'use client'

import { ReactNode } from 'react'

interface IPhoneFrameProps {
  children: ReactNode
}

export default function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="iphone-tilt relative mx-auto" style={{ width: 320, height: 660 }}>
      {/* Outer shell — isolate stacking context so 3D transform doesn't break overflow clipping */}
      <div
        className="relative w-full h-full rounded-[40px] bg-black shadow-2xl border-[3px] border-gray-800"
        style={{ isolation: 'isolate', overflow: 'hidden' }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 w-[100px] h-[28px] bg-black rounded-full" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 z-40 h-12 flex items-end justify-between px-8 pb-0.5">
          <span className="text-white text-[11px] font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-4 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="1" y="6" width="3" height="12" rx="0.5" opacity="0.3" />
              <rect x="6" y="4" width="3" height="14" rx="0.5" opacity="0.5" />
              <rect x="11" y="2" width="3" height="16" rx="0.5" opacity="0.7" />
              <rect x="16" y="0" width="3" height="18" rx="0.5" />
            </svg>
            <div className="flex items-center">
              <div className="w-6 h-3 border border-white rounded-sm relative">
                <div className="absolute inset-0.5 bg-green-400 rounded-[1px]" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen content area — rounded bottom to match frame, clipped */}
        <div className="absolute inset-0 top-12 bottom-0 rounded-b-[37px] bg-[#F8F9FA] overflow-hidden">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50 w-[120px] h-[4px] bg-white/40 rounded-full" />
      </div>
    </div>
  )
}
