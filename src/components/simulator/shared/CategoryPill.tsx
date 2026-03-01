'use client'

interface CategoryPillProps {
  name: string
  emoji: string
  colorHex: string
  active?: boolean
  onClick?: () => void
}

export default function CategoryPill({ name, emoji, colorHex, active, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-full whitespace-nowrap px-2.5 py-1 text-[10px] font-medium transition-all"
      style={
        active
          ? { backgroundColor: colorHex, color: 'white' }
          : { backgroundColor: `${colorHex}1F`, color: colorHex }
      }
    >
      <span className="text-[9px]">{emoji}</span>
      <span>{name}</span>
    </button>
  )
}
