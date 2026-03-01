import { Suspense } from 'react'
import ApplyForm from './ApplyForm'

export const metadata = {
  title: 'Apply | G2K Your City',
}

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyForm />
    </Suspense>
  )
}
