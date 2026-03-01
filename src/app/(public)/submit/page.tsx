import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SubmitEventForm from './SubmitEventForm'

export const metadata = {
  title: 'Submit Event | G2K Your City',
}

export default async function SubmitPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/submit')
  }

  return (
    <Suspense>
      <SubmitEventForm />
    </Suspense>
  )
}
