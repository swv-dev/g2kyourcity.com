'use client'

import Image from 'next/image'

interface SimNavBarProps {
  title: string
}

export default function SimNavBar({ title }: SimNavBarProps) {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-white/95 backdrop-blur-sm border-b border-[#F3F4F6]">
      {/* G2K Your City Logo */}
      <div className="w-7 h-7 flex-shrink-0">
        <Image
          src="/images/g2k_your_city_logo.png"
          alt="G2K"
          width={28}
          height={28}
          className="object-contain"
        />
      </div>
      {/* Title */}
      <span className="text-[13px] font-semibold text-[#1B365D]">{title}</span>
      {/* Spacer for centering */}
      <div className="w-7" />
    </div>
  )
}
