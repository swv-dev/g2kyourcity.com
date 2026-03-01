'use client'

import { ReactNode } from 'react'

interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export default function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
  return (
    <div className={`flex gap-3 overflow-x-auto scrollbar-hide pb-1 ${className}`}>
      {children}
    </div>
  )
}
