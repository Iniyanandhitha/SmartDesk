import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/session'

export function proxy(request: NextRequest) {
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next()

  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('next', next)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
