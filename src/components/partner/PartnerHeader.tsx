'use client'

import { signOut } from '@/app/login/actions'
import { Button } from '@/components/ui/button'

interface PartnerHeaderProps {
  orgName: string
  email: string
}

export default function PartnerHeader({ orgName, email }: PartnerHeaderProps) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-navy">{orgName}</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{email}</span>
        <form action={signOut}>
          <Button variant="outline" size="sm" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
    </header>
  )
}
