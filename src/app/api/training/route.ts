export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { trainingLogs, teamMembers } from '@/lib/schema'
import { eq, and, desc } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const memberId = req.nextUrl.searchParams.get('memberId')

  const query = db
    .select()
    .from(trainingLogs)
    .where(
      memberId
        ? and(eq(trainingLogs.orgId, session.orgId), eq(trainingLogs.memberId, memberId))
        : eq(trainingLogs.orgId, session.orgId)
    )
    .orderBy(desc(trainingLogs.date))
    .all()

  return NextResponse.json(query)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { memberId, memberName, date, topic, description, score, trainer, notes } = await req.json()
  if (!memberId || !memberName || !date || !topic) {
    return NextResponse.json({ error: 'memberId, memberName, date, and topic are required' }, { status: 400 })
  }

  // Verify member belongs to this org
  const memberCheck = db.select({ id: teamMembers.id }).from(teamMembers)
    .where(and(eq(teamMembers.id, memberId), eq(teamMembers.orgId, session.orgId))).get()
  if (!memberCheck) return NextResponse.json({ error: 'Team member not found' }, { status: 404 })

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(trainingLogs).values({
    id,
    orgId: session.orgId,
    memberId,
    memberName,
    date: Number(date),
    topic,
    description: description?.trim() || null,
    score: score ? Number(score) : null,
    trainer: trainer?.trim() || null,
    notes: notes?.trim() || null,
    createdAt: now,
  }).run()

  const record = db.select().from(trainingLogs).where(eq(trainingLogs.id, id)).get()
  return NextResponse.json(record, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(trainingLogs)
    .where(and(eq(trainingLogs.id, id), eq(trainingLogs.orgId, session.orgId)))
    .run()

  return NextResponse.json({ ok: true })
}
