'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { ModerationStatus, UserRole, SponsorshipTier, DiscountType } from '@/types/supabase'

// ── Events ──────────────────────────────────────────────

export async function moderateEvent(
  id: string,
  status: ModerationStatus,
  note?: string
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('events')
    .update({ moderation_status: status, moderation_note: note ?? null })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/events')
  revalidatePath('/admin')
}

// ── Places ──────────────────────────────────────────────

export async function moderatePlace(
  id: string,
  status: ModerationStatus,
  note?: string
) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('place_submissions')
    .update({ moderation_status: status, moderation_note: note ?? null })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/places')
  revalidatePath('/admin')
}

// ── Users ───────────────────────────────────────────────

export async function approveUser(id: string, role: UserRole) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('profiles')
    .update({ role, approved_at: new Date().toISOString() })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/users')
  revalidatePath('/admin')
}

export async function rejectUser(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('profiles')
    .update({ role: 'pending' as UserRole })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/users')
  revalidatePath('/admin')
}

// ── Sponsorships ────────────────────────────────────────

export async function createSponsorship(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('place_sponsorships').insert({
    place_id: formData.get('place_id') as string,
    tier: (formData.get('tier') as SponsorshipTier) || 'basic',
    is_active: true,
    starts_at: (formData.get('starts_at') as string) || null,
    expires_at: (formData.get('expires_at') as string) || null,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin/sponsorships')
  revalidatePath('/admin')
}

export async function toggleSponsorship(id: string, isActive: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('place_sponsorships')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/sponsorships')
}

// ── Deals ───────────────────────────────────────────────

export async function createDeal(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('place_deals').insert({
    place_id: formData.get('place_id') as string,
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    discount_type: formData.get('discount_type') as DiscountType,
    discount_value: Number(formData.get('discount_value')),
    coupon_code: (formData.get('coupon_code') as string) || null,
    terms: (formData.get('terms') as string) || null,
    is_active: true,
    starts_at: (formData.get('starts_at') as string) || null,
    expires_at: (formData.get('expires_at') as string) || null,
    max_redemptions: formData.get('max_redemptions')
      ? Number(formData.get('max_redemptions'))
      : null,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin/sponsorships')
}

export async function toggleDeal(id: string, isActive: boolean) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('place_deals')
    .update({ is_active: isActive })
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/sponsorships')
}
