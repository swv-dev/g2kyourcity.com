'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function submitEvent(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to submit an event' }
  }

  const { error } = await supabase.from('events').insert({
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    location: (formData.get('location') as string) || null,
    address: (formData.get('address') as string) || null,
    start_date: formData.get('start_date') as string,
    end_date: (formData.get('end_date') as string) || null,
    organizer: (formData.get('organizer') as string) || null,
    image_url: (formData.get('image_url') as string) || null,
    moderation_status: 'pending_review',
    submitted_by: user.id,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/submit?success=true')
}
