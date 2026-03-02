'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

const navItems = [
  {
    href: '/partner/analytics',
    label: 'Analytics',
    icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
    premiumOnly: true,
  },
  {
    href: '/partner/my-places',
    label: 'My Places',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    premiumOnly: false,
  },
  {
    href: '/partner/account',
    label: 'Account',
    icon: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z',
    premiumOnly: false,
  },
]

interface PartnerSidebarProps {
  orgName: string
  partnerTier: 'premium' | 'basic'
}

export default function PartnerSidebar({ orgName, partnerTier }: PartnerSidebarProps) {
  const pathname = usePathname()

  const visibleItems = navItems.filter(
    (item) => !item.premiumOnly || partnerTier === 'premium'
  )

  return (
    <aside className="w-64 bg-navy min-h-screen flex flex-col">
      <div className="p-6 border-b border-navy-light">
        <h1 className="text-gold font-bold text-xl">G2K Partner</h1>
        <p className="text-gray-400 text-sm mt-1 truncate">{orgName}</p>
        <Badge
          className={`mt-2 text-xs ${
            partnerTier === 'premium'
              ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
              : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
          }`}
          variant="outline"
        >
          {partnerTier === 'premium' ? 'Premium' : 'Basic'}
        </Badge>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {visibleItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-navy-light text-gold'
                  : 'text-gray-300 hover:bg-navy-light hover:text-white'
              }`}
            >
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
