export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { organizations, users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { signToken, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { orgName, orgType, name, email, password } = await req.json()

    if (!orgName || !orgType || !name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    // Check email uniqueness
    const existing = db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).get()
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    }

    const now = Date.now()
    const orgId = crypto.randomUUID()
    const userId = crypto.randomUUID()
    const passwordHash = await bcrypt.hash(password, 12)
    const trialEndsAt = now + 14 * 24 * 60 * 60 * 1000 // 14-day trial

    // Create org
    db.insert(organizations).values({
      id: orgId,
      name: orgName.trim(),
      type: orgType,
      plan: 'trial',
      planStatus: 'trialing',
      trialEndsAt,
      createdAt: now,
    }).run()

    // Create user
    db.insert(users).values({
      id: userId,
      orgId,
      email: email.toLowerCase().trim(),
      passwordHash,
      name: name.trim(),
      role: 'owner',
      createdAt: now,
    }).run()

    const token = await signToken({
      userId,
      orgId,
      role: 'owner',
      email: email.toLowerCase().trim(),
      name: name.trim(),
      orgName: orgName.trim(),
    })

    await setSessionCookie(token)

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[signup]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
