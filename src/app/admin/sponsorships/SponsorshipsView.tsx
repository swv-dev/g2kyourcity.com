'use client'

import { useState } from 'react'
import {
  createSponsorship,
  toggleSponsorship,
  createDeal,
  toggleDeal,
} from '../actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Database } from '@/types/supabase'

type Sponsorship = Database['public']['Tables']['place_sponsorships']['Row']
type Deal = Database['public']['Tables']['place_deals']['Row']

interface Props {
  sponsorships: Sponsorship[]
  deals: Deal[]
}

export default function SponsorshipsView({ sponsorships, deals }: Props) {
  const [showNewSponsorship, setShowNewSponsorship] = useState(false)
  const [showNewDeal, setShowNewDeal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleCreateSponsorship(formData: FormData) {
    setLoading(true)
    await createSponsorship(formData)
    setShowNewSponsorship(false)
    setLoading(false)
  }

  async function handleCreateDeal(formData: FormData) {
    setLoading(true)
    await createDeal(formData)
    setShowNewDeal(false)
    setLoading(false)
  }

  return (
    <Tabs defaultValue="sponsorships">
      <TabsList>
        <TabsTrigger value="sponsorships">
          Sponsorships ({sponsorships.length})
        </TabsTrigger>
        <TabsTrigger value="deals">Deals ({deals.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="sponsorships" className="mt-4">
        <div className="flex justify-end mb-4">
          <Button
            className="bg-navy hover:bg-navy-dark"
            onClick={() => setShowNewSponsorship(true)}
          >
            New Sponsorship
          </Button>
        </div>

        {sponsorships.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No sponsorships yet.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Place ID</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Starts</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsorships.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-mono text-xs">
                    {s.place_id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {s.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        s.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }
                    >
                      {s.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {s.starts_at
                      ? new Date(s.starts_at).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell>
                    {s.expires_at
                      ? new Date(s.expires_at).toLocaleDateString()
                      : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSponsorship(s.id, !s.is_active)}
                    >
                      {s.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TabsContent>

      <TabsContent value="deals" className="mt-4">
        <div className="flex justify-end mb-4">
          <Button
            className="bg-navy hover:bg-navy-dark"
            onClick={() => setShowNewDeal(true)}
          >
            New Deal
          </Button>
        </div>

        {deals.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No deals yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Redemptions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deals.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="font-medium">{d.title}</TableCell>
                  <TableCell>
                    {d.discount_type === 'percentage'
                      ? `${d.discount_value}%`
                      : d.discount_type === 'fixed'
                      ? `$${d.discount_value}`
                      : d.discount_type}
                  </TableCell>
                  <TableCell className="font-mono">
                    {d.coupon_code ?? '—'}
                  </TableCell>
                  <TableCell>
                    {d.redemption_count}
                    {d.max_redemptions ? ` / ${d.max_redemptions}` : ''}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        d.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }
                    >
                      {d.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleDeal(d.id, !d.is_active)}
                    >
                      {d.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TabsContent>

      {/* New Sponsorship Dialog */}
      <Dialog
        open={showNewSponsorship}
        onOpenChange={setShowNewSponsorship}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Sponsorship</DialogTitle>
          </DialogHeader>
          <form action={handleCreateSponsorship} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="place_id">Place ID</Label>
              <Input
                id="place_id"
                name="place_id"
                placeholder="UUID of the place"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tier">Tier</Label>
              <select
                id="tier"
                name="tier"
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
                defaultValue="basic"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="elite">Elite</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="starts_at">Starts</Label>
                <Input id="starts_at" name="starts_at" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires_at">Expires</Label>
                <Input id="expires_at" name="expires_at" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowNewSponsorship(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-navy hover:bg-navy-dark"
                disabled={loading}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* New Deal Dialog */}
      <Dialog open={showNewDeal} onOpenChange={setShowNewDeal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Deal</DialogTitle>
          </DialogHeader>
          <form action={handleCreateDeal} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deal_place_id">Place ID</Label>
              <Input
                id="deal_place_id"
                name="place_id"
                placeholder="UUID of the place"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal_title">Title</Label>
              <Input
                id="deal_title"
                name="title"
                placeholder="e.g. 20% Off First Visit"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal_description">Description</Label>
              <Textarea
                id="deal_description"
                name="description"
                placeholder="Deal details"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount_type">Discount Type</Label>
                <select
                  id="discount_type"
                  name="discount_type"
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                  defaultValue="percentage"
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                  <option value="bogo">BOGO</option>
                  <option value="free_item">Free Item</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount_value">Value</Label>
                <Input
                  id="discount_value"
                  name="discount_value"
                  type="number"
                  placeholder="20"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coupon_code">Coupon Code</Label>
                <Input
                  id="coupon_code"
                  name="coupon_code"
                  placeholder="SAVE20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max_redemptions">Max Redemptions</Label>
                <Input
                  id="max_redemptions"
                  name="max_redemptions"
                  type="number"
                  placeholder="Unlimited"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deal_terms">Terms</Label>
              <Textarea
                id="deal_terms"
                name="terms"
                placeholder="Terms and conditions"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deal_starts">Starts</Label>
                <Input id="deal_starts" name="starts_at" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deal_expires">Expires</Label>
                <Input id="deal_expires" name="expires_at" type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowNewDeal(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-navy hover:bg-navy-dark"
                disabled={loading}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}
