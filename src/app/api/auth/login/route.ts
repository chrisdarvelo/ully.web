export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users, organizations } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { signToken, setSessionCookie } from '@/lib/auth'

// ── In-process login rate limiter (keyed by IP) ────────────────────────────────
const loginRateLimit = new Map<string, { count: number; windowStart: number }>()
const LOGIN_LIMIT = 10
const LOGIN_WINDOW_MS = 900_000 // 15 minutes

function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = loginRateLimit.get(ip)
  if (!entry || now - entry.windowStart >= LOGIN_WINDOW_MS) {
    return false
  }
  return entry.count >= LOGIN_LIMIT
}

function recordFailedLogin(ip: string): void {
  const now = Date.now()
  const entry = loginRateLimit.get(ip)
  if (!entry || now - entry.windowStart >= LOGIN_WINDOW_MS) {
    loginRateLimit.set(ip, { count: 1, windowStart: now })
  } else {
    entry.count++
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? '127.0.0.1'

  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    if (checkLoginRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many login attempts. Try again in 15 minutes.' }, { status: 429 })
    }

    const user = db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).get()

    if (!user) {
      // Constant-time failure
      await bcrypt.compare(password, '$2b$12$invalidhashpaddingtoconstanttime')
      recordFailedLogin(ip)
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      recordFailedLogin(ip)
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    if (!user.orgId) {
      return NextResponse.json({ error: 'Account is not associated with an organization.' }, { status: 403 })
    }

    const org = db.select().from(organizations).where(eq(organizations.id, user.orgId)).get()

    const token = await signToken({
      userId: user.id,
      orgId: user.orgId,
      role: user.role,
      email: user.email,
      name: user.name,
      orgName: org?.name ?? '',
      sv: (user as unknown as { session_version?: number }).session_version ?? 1,
    })

    await setSessionCookie(token)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[login]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
