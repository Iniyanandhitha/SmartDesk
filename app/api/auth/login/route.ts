import { NextResponse } from 'next/server'
import { authenticate, publicUser } from '@/lib/auth'

export async function POST(request: Request) {
  const { email, password, remember } = await request.json()
  const user = authenticate(email ?? '', password ?? '')
  if (!user) return NextResponse.json({ error: 'The email or password is incorrect.' }, { status: 401 })
  const response = NextResponse.json({ user: publicUser(user) })
  response.cookies.set('smartdesk_session', encodeURIComponent(JSON.stringify(publicUser(user))), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', ...(remember ? { maxAge: 60 * 60 * 24 * 7 } : {}) })
  return response
}
