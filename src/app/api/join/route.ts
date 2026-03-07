export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { invites, organizations, users } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { signToken, setSessionCookie } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export const runtime = 'nodejs'

// Public endpoint — no session required
// Validates invite code + creates user account + issues session
export async function POST(req: NextRequest) {
  try {
    const { code, userName, email, password } = await req.json()
    if (!code || !userName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const invite = db.select().from(invites).where(eq(invites.code, code.trim().toUpperCase())).get()
    if (!invite) return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 })
    if (invite.usedBy) return NextResponse.json({ error: 'This invite has already been used' }, { status: 409 })
    if (invite.expiresAt < Date.now()) return NextResponse.json({ error: 'This invite has expired' }, { status: 410 })

    const existing = db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).get()
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 })

    const org = db.select().from(organizations).where(eq(organizations.id, invite.orgId)).get()
    if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 404 })

    const passwordHash = await bcrypt.hash(password, 12)
    const userId = crypto.randomUUID()
    const now = Date.now()

    db.insert(users).values({
      id: userId,
      orgId: invite.orgId,
      email: email.toLowerCase().trim(),
      passwordHash,
      name: userName.trim(),
      role: invite.role,
      createdAt: now,
    }).run()

    db.update(invites)
      .set({ usedBy: userId, usedAt: now })
      .where(eq(invites.id, invite.id))
      .run()

    const token = await signToken({
      userId,
      orgId: invite.orgId,
      email: email.toLowerCase().trim(),
      role: invite.role,
      name: userName.trim(),
      orgName: org.name,
    })
    await setSessionCookie(token)

    return NextResponse.json({ ok: true, orgName: org.name })
  } catch (err) {
    console.error('[join]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
