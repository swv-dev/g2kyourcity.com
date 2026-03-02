import { createClient } from '@/lib/supabase/server'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CreatePartnerDialog from './CreatePartnerDialog'

export default async function AdminPartnersPage() {
  const supabase = await createClient()

  // Get all partners (trusted_org users)
  const { data: partners } = await supabase
    .from('profiles')
    .select('id, email, org_name, partner_tier, display_name, approved_at')
    .eq('role', 'trusted_org')
    .order('org_name')

  // Get place counts for each partner
  const partnerIds = (partners ?? []).map((p) => p.id)
  const { data: allPlaces } = partnerIds.length > 0
    ? await supabase
        .from('partner_places')
        .select('partner_id, place_id')
        .in('partner_id', partnerIds)
    : { data: [] }

  const placeCountMap = new Map<string, number>()
  for (const place of allPlaces ?? []) {
    placeCountMap.set(
      place.partner_id,
      (placeCountMap.get(place.partner_id) ?? 0) + 1
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy">Partners</h1>
        <CreatePartnerDialog />
      </div>

      {!partners || partners.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-lg font-medium text-gray-700">No partners yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Create your first partner account to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead className="text-right">Linked Places</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="font-medium">
                      {partner.org_name ?? partner.display_name ?? '—'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {partner.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          partner.partner_tier === 'premium'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            : 'bg-blue-100 text-blue-800 border-blue-300'
                        }
                      >
                        {partner.partner_tier === 'premium' ? 'Premium' : 'Basic'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {placeCountMap.get(partner.id) ?? 0}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {partner.approved_at
                        ? new Date(partner.approved_at).toLocaleDateString()
                        : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
