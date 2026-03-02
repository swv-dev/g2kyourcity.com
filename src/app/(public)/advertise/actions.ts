'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitLeadForm(formData: FormData) {
  const business_name = formData.get('business_name') as string
  const contact_name = formData.get('contact_name') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const website = (formData.get('website') as string) || null
  const tier_interest = (formData.get('tier_interest') as string) || null
  const message = (formData.get('message') as string) || null

  if (!business_name || !contact_name || !email) {
    return { error: 'Please fill in all required fields.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('advertiser_leads').insert({
    business_name,
    contact_name,
    email,
    phone,
    website,
    tier_interest: tier_interest as 'basic' | 'premium' | 'elite' | null,
    message,
    source: 'website',
  })

  if (error) return { error: 'Something went wrong. Please try again.' }
  return { success: true }
}
