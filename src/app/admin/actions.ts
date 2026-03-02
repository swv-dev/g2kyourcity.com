'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { ModerationStatus, UserRole, SponsorshipTier, DiscountType, ContactStatus, LeadStatus, NoteEntityType } from '@/types/supabase'

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

// ── Contacts ─────────────────────────────────────────────

export async function updateContactStatus(id: string, status: ContactStatus) {
  const supabase = await createClient()
  const update: Record<string, unknown> = { status }
  if (status === 'responded') {
    update.responded_at = new Date().toISOString()
  }
  const { error } = await supabase
    .from('contact_submissions')
    .update(update)
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/contacts')
  revalidatePath('/admin')
}

export async function exportContactsCsv() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return { error: error.message }

  const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Created', 'Responded']
  const rows = (data ?? []).map((r) => [
    r.name,
    r.email,
    r.phone ?? '',
    r.subject,
    r.message.replace(/"/g, '""'),
    r.status,
    r.created_at,
    r.responded_at ?? '',
  ])

  const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n')
  return { csv, filename: `contacts-${new Date().toISOString().slice(0, 10)}.csv` }
}

// ── Leads ────────────────────────────────────────────────

export async function updateLeadStatus(id: string, status: LeadStatus) {
  const supabase = await createClient()
  const update: Record<string, unknown> = { status }
  if (status === 'contacted') {
    update.contacted_at = new Date().toISOString()
  } else if (status === 'converted') {
    update.converted_at = new Date().toISOString()
  }
  const { error } = await supabase
    .from('advertiser_leads')
    .update(update)
    .eq('id', id)

  if (error) return { error: error.message }
  revalidatePath('/admin/leads')
  revalidatePath('/admin')
}

export async function exportLeadsCsv() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('advertiser_leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return { error: error.message }

  const headers = ['Business', 'Contact', 'Email', 'Phone', 'Website', 'Tier Interest', 'Message', 'Source', 'Status', 'Created', 'Contacted', 'Converted']
  const rows = (data ?? []).map((r) => [
    r.business_name,
    r.contact_name,
    r.email,
    r.phone ?? '',
    r.website ?? '',
    r.tier_interest ?? '',
    (r.message ?? '').replace(/"/g, '""'),
    r.source,
    r.status,
    r.created_at,
    r.contacted_at ?? '',
    r.converted_at ?? '',
  ])

  const csv = [headers.join(','), ...rows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n')
  return { csv, filename: `leads-${new Date().toISOString().slice(0, 10)}.csv` }
}

// ── Analytics ────────────────────────────────────────────

export async function exportAnalyticsCsv() {
  const supabase = await createClient()

  const now = new Date().toISOString()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  const [zones, places, dau] = await Promise.all([
    supabase.rpc('analytics_zone_traffic', { p_start: thirtyDaysAgo, p_end: now, p_grain: 'day' }),
    supabase.rpc('analytics_place_traffic', { p_start: thirtyDaysAgo, p_end: now }),
    supabase.rpc('analytics_dau_mau', { p_days: 30 }),
  ])

  const sheets: string[] = []

  // Zone traffic sheet
  const zoneHeaders = ['Zone ID', 'Zone Type', 'Date', 'Entries', 'Unique Visitors']
  const zoneRows = (zones.data ?? []).map((r) => [
    r.zone_id,
    r.zone_type,
    r.bucket,
    r.entry_count,
    r.unique_visitors,
  ])
  sheets.push(
    '--- Zone Traffic ---\n' +
    [zoneHeaders.join(','), ...zoneRows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n')
  )

  // Place traffic sheet
  const placeHeaders = ['Place ID', 'Business Type', 'Visits', 'Unique Visitors', 'Avg Dwell (s)']
  const placeRows = (places.data ?? []).map((r) => [
    r.place_id,
    r.business_type ?? '',
    r.visit_count,
    r.unique_visitors,
    r.avg_dwell_seconds ?? '',
  ])
  sheets.push(
    '--- Place Traffic ---\n' +
    [placeHeaders.join(','), ...placeRows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n')
  )

  // DAU/MAU sheet
  const dauHeaders = ['Date', 'DAU', 'Sessions', 'Avg Session (s)', 'MAU']
  const dauRows = (dau.data ?? []).map((r) => [
    r.report_date,
    r.daily_active_users,
    r.session_count,
    r.avg_session_seconds ?? '',
    r.monthly_active_users,
  ])
  sheets.push(
    '--- Daily Engagement ---\n' +
    [dauHeaders.join(','), ...dauRows.map((r) => r.map((v) => `"${v}"`).join(','))].join('\n')
  )

  const csv = sheets.join('\n\n')
  return { csv, filename: `analytics-${new Date().toISOString().slice(0, 10)}.csv` }
}

// ── Notes ────────────────────────────────────────────────

export async function addNote(entityType: NoteEntityType, entityId: string, note: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase.from('admin_notes').insert({
    entity_type: entityType,
    entity_id: entityId,
    admin_id: user.id,
    note,
  })

  if (error) return { error: error.message }
  revalidatePath('/admin/contacts')
  revalidatePath('/admin/leads')
}

export async function fetchNotes(entityType: NoteEntityType, entityId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('admin_notes')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false })

  if (error) return { notes: [], error: error.message }
  return { notes: data ?? [] }
}
