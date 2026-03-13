export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { schedules, teamMembers } from '@/lib/schema'
import { eq, and, gte, lte } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const startParam = req.nextUrl.searchParams.get('start')
  const endParam = req.nextUrl.searchParams.get('end')

  const start = startParam ? Number(startParam) : 0
  const end = endParam ? Number(endParam) : Date.now() + 365 * 86400000
  if (startParam && isNaN(start)) return NextResponse.json({ error: 'Invalid start date' }, { status: 400 })
  if (endParam && isNaN(end)) return NextResponse.json({ error: 'Invalid end date' }, { status: 400 })

  // Join schedules with team member names
  const rows = db
    .select({
      id: schedules.id,
      memberId: schedules.memberId,
      memberName: teamMembers.name,
      date: schedules.date,
      shiftStart: schedules.shiftStart,
      shiftEnd: schedules.shiftEnd,
      position: schedules.position,
      notes: schedules.notes,
    })
    .from(schedules)
    .innerJoin(teamMembers, eq(schedules.memberId, teamMembers.id))
    .where(
      and(
        eq(schedules.orgId, session.orgId),
        gte(schedules.date, start),
        lte(schedules.date, end)
      )
    )
    .all()

  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { memberId, date, shiftStart, shiftEnd, position, notes } = await req.json()
  if (!memberId || !date) return NextResponse.json({ error: 'Member and date are required' }, { status: 400 })

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(schedules).values({
    id,
    orgId: session.orgId,
    memberId,
    date: Number(date),
    shiftStart: shiftStart ?? '09:00',
    shiftEnd: shiftEnd ?? '17:00',
    position: position?.trim() || null,
    notes: notes?.trim() || null,
    createdAt: now,
  }).run()

  const item = db.select().from(schedules).where(eq(schedules.id, id)).get()
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id, shiftStart, shiftEnd, position, notes } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.update(schedules)
    .set({
      shiftStart: shiftStart ?? '09:00',
      shiftEnd: shiftEnd ?? '17:00',
      position: position?.trim() || null,
      notes: notes?.trim() || null,
    })
    .where(and(eq(schedules.id, id), eq(schedules.orgId, session.orgId)))
    .run()

  const item = db.select().from(schedules).where(eq(schedules.id, id)).get()
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(schedules).where(and(eq(schedules.id, id), eq(schedules.orgId, session.orgId))).run()
  return NextResponse.json({ ok: true })
}
