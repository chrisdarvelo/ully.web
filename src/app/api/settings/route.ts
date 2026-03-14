export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSession, clearSessionCookie, signToken, setSessionCookie } from '@/lib/auth'
import { db } from '@/lib/db'
import { organizations, users, schedules, inventory, expenseRecords, revenueRecords, serviceRecords, teamMembers, equipment, invites, trainingLogs } from '@/lib/schema'
import { eq, sql } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const org = db.select().from(organizations).where(eq(organizations.id, session.orgId)).get()
  const user = db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role })
    .from(users)
    .where(eq(users.id, session.userId))
    .get()

  return NextResponse.json({ org, user })
}

export async function PATCH(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { target } = body

  if (target === 'org') {
    const { name, type, address, phone, email } = body
    if (!name?.trim()) return NextResponse.json({ error: 'Business name is required' }, { status: 400 })

    db.update(organizations)
      .set({
        name: name.trim(),
        type,
        address: address?.trim() || null,
        phone: phone?.trim() || null,
        email: email?.trim() || null,
      })
      .where(eq(organizations.id, session.orgId))
      .run()

    return NextResponse.json({ ok: true })
  }

  if (target === 'account') {
    const { name, email } = body
    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // Check email uniqueness if changed
    if (email.toLowerCase().trim() !== session.email) {
      const existing = db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).get()
      if (existing && existing.id !== session.userId) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
      }
    }

    db.update(users)
      .set({ name: name.trim(), email: email.toLowerCase().trim() })
      .where(eq(users.id, session.userId))
      .run()

    return NextResponse.json({ ok: true })
  }

  if (target === 'password') {
    const { currentPassword, newPassword } = body
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Both passwords are required' }, { status: 400 })
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'New password must be at least 8 characters' }, { status: 400 })
    }

    const user = db.select().from(users).where(eq(users.id, session.userId)).get()
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const valid = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!valid) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 })

    const newHash = await bcrypt.hash(newPassword, 12)
    db.update(users)
      .set({ passwordHash: newHash })
      .where(eq(users.id, session.userId))
      .run()
    // Increment session_version to invalidate existing sessions on other devices
    db.run(sql`UPDATE users SET session_version = session_version + 1 WHERE id = ${session.userId}`)

    // Re-fetch updated user to get new session_version
    const updatedUser = db.select().from(users).where(eq(users.id, session.userId)).get()
    const newSv = (updatedUser as unknown as { session_version?: number }).session_version ?? 1

    const org = db.select().from(organizations).where(eq(organizations.id, session.orgId)).get()
    const newToken = await signToken({
      userId: session.userId,
      orgId: session.orgId,
      role: session.role,
      email: session.email,
      name: session.name,
      orgName: org?.name ?? session.orgName,
      sv: newSv,
    })
    await setSessionCookie(newToken)

    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Invalid target' }, { status: 400 })
}

export async function DELETE() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Only owners can delete the org
  if (session.role !== 'owner') {
    return NextResponse.json({ error: 'Only org owners can delete the organization' }, { status: 403 })
  }

  // Delete all org data atomically in reverse dependency order
  ;(db as unknown as { transaction: (fn: () => void) => void }).transaction(() => {
    db.delete(trainingLogs).where(eq(trainingLogs.orgId, session.orgId)).run()
    db.delete(schedules).where(eq(schedules.orgId, session.orgId)).run()
    db.delete(inventory).where(eq(inventory.orgId, session.orgId)).run()
    db.delete(expenseRecords).where(eq(expenseRecords.orgId, session.orgId)).run()
    db.delete(revenueRecords).where(eq(revenueRecords.orgId, session.orgId)).run()
    db.delete(serviceRecords).where(eq(serviceRecords.orgId, session.orgId)).run()
    db.delete(teamMembers).where(eq(teamMembers.orgId, session.orgId)).run()
    db.delete(equipment).where(eq(equipment.orgId, session.orgId)).run()
    db.delete(invites).where(eq(invites.orgId, session.orgId)).run()
    db.delete(users).where(eq(users.orgId, session.orgId)).run()
    db.delete(organizations).where(eq(organizations.id, session.orgId)).run()
  })

  await clearSessionCookie()

  return NextResponse.json({ ok: true })
}
