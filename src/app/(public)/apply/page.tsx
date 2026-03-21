import { Suspense } from 'react'
import ApplyForm from './ApplyForm'

export const metadata = {
  title: 'Apply | G2K Your City\u2122',
}

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyForm />
    </Suspense>
  )
}
