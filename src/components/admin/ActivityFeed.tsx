import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface ActivityItem {
  id: string
  activity_type: string
  title: string
  status: string
  created_at: string
}

const typeLabels: Record<string, string> = {
  contact: 'Contact',
  lead: 'Lead',
  event: 'Event',
  user: 'User',
}

const typeColors: Record<string, string> = {
  contact: 'bg-blue-100 text-blue-800',
  lead: 'bg-purple-100 text-purple-800',
  event: 'bg-green-100 text-green-800',
  user: 'bg-orange-100 text-orange-800',
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

export default function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        No recent activity.
      </p>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <ul className="divide-y">
          {items.map((item) => (
            <li key={`${item.activity_type}-${item.id}`} className="px-4 py-3 flex items-center gap-3">
              <Badge
                className={typeColors[item.activity_type] ?? 'bg-gray-100 text-gray-800'}
                variant="secondary"
              >
                {typeLabels[item.activity_type] ?? item.activity_type}
              </Badge>
              <span className="text-sm text-gray-800 flex-1 truncate">
                {item.title}
              </span>
              <span className="text-xs text-gray-400 flex-shrink-0">
                {timeAgo(item.created_at)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
