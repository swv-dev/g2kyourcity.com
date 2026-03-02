'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = (formData.get('phone') as string) || null
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !subject || !message) {
    return { error: 'Please fill in all required fields.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('contact_submissions').insert({
    name,
    email,
    phone,
    subject,
    message,
  })

  if (error) return { error: 'Something went wrong. Please try again.' }
  return { success: true }
}
