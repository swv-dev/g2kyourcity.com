'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GatePage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(false)
    setLoading(true)

    const res = await fetch('/api/gate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.trim() }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError(true)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🌍</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            G2K Your City
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            This site is currently under development
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code"
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors text-center tracking-widest"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">
              Incorrect access code
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>

        <p className="text-slate-700 text-xs text-center mt-8">
          Get to Know Your City &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
