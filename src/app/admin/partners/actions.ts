'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { PartnerTier } from '@/types/supabase'

interface CreatePartnerInput {
  email: string
  password: string
  displayName: string
  orgName: string
  tier: PartnerTier
  placeIds: string[]
}

export async function createPartner(input: CreatePartnerInput) {
  // Verify caller is admin
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (callerProfile?.role !== 'admin') return { error: 'Not authorized' }

  const admin = createAdminClient()

  // Create auth user
  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
  })

  if (authError) return { error: authError.message }
  if (!authData.user) return { error: 'Failed to create user' }

  const partnerId = authData.user.id

  // Upsert profile with partner role and tier
  const { error: profileError } = await admin
    .from('profiles')
    .upsert({
      id: partnerId,
      email: input.email,
      display_name: input.displayName,
      org_name: input.orgName,
      role: 'trusted_org',
      partner_tier: input.tier,
    })

  if (profileError) return { error: profileError.message }

  // Insert partner_places if any
  if (input.placeIds.length > 0) {
    const rows = input.placeIds.map((placeId) => ({
      partner_id: partnerId,
      place_id: placeId.trim(),
    }))

    const { error: placesError } = await admin
      .from('partner_places')
      .insert(rows)

    if (placesError) return { error: placesError.message }
  }

  revalidatePath('/admin/partners')
  return { success: true }
}

export async function updatePartnerTier(partnerId: string, tier: PartnerTier) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (callerProfile?.role !== 'admin') return { error: 'Not authorized' }

  const admin = createAdminClient()
  const { error } = await admin
    .from('profiles')
    .update({ partner_tier: tier })
    .eq('id', partnerId)

  if (error) return { error: error.message }

  revalidatePath('/admin/partners')
  return { success: true }
}

export async function updatePartnerPlaces(partnerId: string, placeIds: string[]) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (callerProfile?.role !== 'admin') return { error: 'Not authorized' }

  const admin = createAdminClient()

  // Delete existing places
  const { error: deleteError } = await admin
    .from('partner_places')
    .delete()
    .eq('partner_id', partnerId)

  if (deleteError) return { error: deleteError.message }

  // Insert new places
  if (placeIds.length > 0) {
    const rows = placeIds.map((placeId) => ({
      partner_id: partnerId,
      place_id: placeId.trim(),
    }))

    const { error: insertError } = await admin
      .from('partner_places')
      .insert(rows)

    if (insertError) return { error: insertError.message }
  }

  revalidatePath('/admin/partners')
  return { success: true }
}

export async function deletePartner(partnerId: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  if (callerProfile?.role !== 'admin') return { error: 'Not authorized' }

  const admin = createAdminClient()

  // Delete auth user — cascades to profile and partner_places
  const { error } = await admin.auth.admin.deleteUser(partnerId)
  if (error) return { error: error.message }

  revalidatePath('/admin/partners')
  return { success: true }
}
