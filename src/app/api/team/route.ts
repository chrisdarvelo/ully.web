import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { teamMembers } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const items = db.select().from(teamMembers).where(eq(teamMembers.orgId, session.orgId)).all()
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, role, email, phone, hourlyRate, status, notes } = await req.json()
  if (!name?.trim() || !role?.trim()) return NextResponse.json({ error: 'Name and role are required' }, { status: 400 })

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(teamMembers).values({
    id,
    orgId: session.orgId,
    name: name.trim(),
    role: role.trim(),
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    hourlyRate: hourlyRate ? Number(hourlyRate) : null,
    status: status ?? 'active',
    notes: notes?.trim() || null,
    createdAt: now,
  }).run()

  const item = db.select().from(teamMembers).where(eq(teamMembers.id, id)).get()
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, name, role, email, phone, hourlyRate, status, notes } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.update(teamMembers)
    .set({
      name: name?.trim(),
      role: role?.trim(),
      email: email?.trim() || null,
      phone: phone?.trim() || null,
      hourlyRate: hourlyRate ? Number(hourlyRate) : null,
      status,
      notes: notes?.trim() || null,
    })
    .where(and(eq(teamMembers.id, id), eq(teamMembers.orgId, session.orgId)))
    .run()

  const item = db.select().from(teamMembers).where(eq(teamMembers.id, id)).get()
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(teamMembers).where(and(eq(teamMembers.id, id), eq(teamMembers.orgId, session.orgId))).run()
  return NextResponse.json({ ok: true })
}
