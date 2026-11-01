import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SESSION_COOKIE } from '@/lib/session'

export async function GET() {
  const value = (await cookies()).get(SESSION_COOKIE)?.value
  if (!value) return NextResponse.json({ user: null }, { status: 401 })
  try { return NextResponse.json({ user: JSON.parse(decodeURIComponent(value)) }) } catch { return NextResponse.json({ user: null }, { status: 401 }) }
}
