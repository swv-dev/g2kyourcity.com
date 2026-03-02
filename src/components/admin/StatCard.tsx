import { Card, CardContent } from '@/components/ui/card'

interface StatCardProps {
  label: string
  count: number
  href: string
  suffix?: string
}

export default function StatCard({ label, count, href, suffix }: StatCardProps) {
  return (
    <a href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-3xl font-bold text-navy mt-2">
            {count}{suffix && <span className="text-lg ml-0.5">{suffix}</span>}
          </p>
        </CardContent>
      </Card>
    </a>
  )
}
