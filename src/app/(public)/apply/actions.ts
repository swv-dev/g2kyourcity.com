'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function applyForAccount(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const displayName = formData.get('display_name') as string
  const orgName = (formData.get('org_name') as string) || null
  const bio = (formData.get('bio') as string) || null
  const phone = (formData.get('phone') as string) || null
  const website = (formData.get('website') as string) || null

  // Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create account' }
  }

  // Create profile with pending role
  const { error: profileError } = await supabase.from('profiles').upsert({
    id: authData.user.id,
    email,
    display_name: displayName,
    role: 'pending',
    org_name: orgName,
    bio,
    phone,
    website,
    applied_at: new Date().toISOString(),
  })

  if (profileError) {
    return { error: profileError.message }
  }

  redirect('/apply?success=true')
}
