import { Suspense } from 'react'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Sign In | G2K Your City',
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
