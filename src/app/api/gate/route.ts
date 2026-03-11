import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const password = (body.password || '').trim()
  const sitePassword = (process.env.SITE_PASSWORD || '').trim()

  if (password && sitePassword && password === sitePassword) {
    const response = NextResponse.json({ success: true })
    response.cookies.set('g2k_access', 'authorized', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return response
  }

  return NextResponse.json({ success: false }, { status: 401 })
}
