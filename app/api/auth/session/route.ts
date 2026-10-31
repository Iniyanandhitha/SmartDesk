import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const value = (await cookies()).get('smartdesk_session')?.value
  if (!value) return NextResponse.json({ user: null }, { status: 401 })
  try { return NextResponse.json({ user: JSON.parse(decodeURIComponent(value)) }) } catch { return NextResponse.json({ user: null }, { status: 401 }) }
}
