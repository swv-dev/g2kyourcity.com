'use client'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  seeAll?: boolean
  onSeeAll?: () => void
}

export default function SectionHeader({ title, subtitle, seeAll, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between px-3 mb-2">
      <div>
        <p className="text-[13px] font-semibold text-[#1A1A1A]">{title}</p>
        {subtitle && <p className="text-[9px] text-[#6B7280]">{subtitle}</p>}
      </div>
      {seeAll && (
        <button onClick={onSeeAll} className="flex items-center gap-0.5 text-[9px] font-medium text-[#F7B32B]">
          See All
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}
    </div>
  )
}
