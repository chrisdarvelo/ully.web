import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

function getSecret() {
  const secret = process.env.JWT_SECRET ?? 'dev-secret-change-in-production-32chars'
  return new TextEncoder().encode(secret)
}

const PROTECTED_PREFIXES = [
  '/dashboard',
  '/chat',
  '/equipment',
  '/team',
  '/training',
  '/inventory',
  '/schedule',
  '/revenue',
  '/settings',
  '/api/chat',
  '/api/equipment',
  '/api/team',
  '/api/training',
  '/api/inventory',
  '/api/schedule',
  '/api/revenue',
  '/api/service-records',
  '/api/settings',
  '/api/invites',
]

const AUTH_ONLY_PATHS = ['/login', '/signup', '/join']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY_PATHS.some(p => pathname === p)

  const token = req.cookies.get('ully_session')?.value

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    try {
      await jwtVerify(token, getSecret())
      return NextResponse.next()
    } catch {
      const res = NextResponse.redirect(new URL('/login', req.url))
      res.cookies.delete('ully_session')
      return res
    }
  }

  // Redirect authenticated users away from login/signup
  if (isAuthOnly && token) {
    try {
      await jwtVerify(token, getSecret())
      return NextResponse.redirect(new URL('/dashboard', req.url))
    } catch {
      // Invalid token — let them through to login
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|api/auth).*)',
  ],
}
