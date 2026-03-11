export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { serviceRecords, equipment } from '@/lib/schema'
import { eq, and, desc } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const equipmentId = req.nextUrl.searchParams.get('equipmentId')
  if (!equipmentId) return NextResponse.json({ error: 'equipmentId required' }, { status: 400 })

  const records = db
    .select()
    .from(serviceRecords)
    .where(and(eq(serviceRecords.equipmentId, equipmentId), eq(serviceRecords.orgId, session.orgId)))
    .orderBy(desc(serviceRecords.date))
    .all()

  return NextResponse.json(records)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { equipmentId, date, type, description, technician, cost } = await req.json()
  if (!equipmentId || !date || !type) {
    return NextResponse.json({ error: 'equipmentId, date, and type are required' }, { status: 400 })
  }

  // Verify equipment belongs to this org
  const ownerCheck = db.select({ id: equipment.id }).from(equipment)
    .where(and(eq(equipment.id, equipmentId), eq(equipment.orgId, session.orgId))).get()
  if (!ownerCheck) return NextResponse.json({ error: 'Equipment not found' }, { status: 404 })

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(serviceRecords).values({
    id,
    orgId: session.orgId,
    equipmentId,
    date: Number(date),
    type,
    description: description?.trim() || null,
    technician: technician?.trim() || null,
    cost: cost ? Number(cost) : null,
    createdAt: now,
  }).run()

  // Update equipment lastService timestamp
  db.update(equipment)
    .set({ lastService: Number(date) })
    .where(and(eq(equipment.id, equipmentId), eq(equipment.orgId, session.orgId)))
    .run()

  const record = db.select().from(serviceRecords).where(eq(serviceRecords.id, id)).get()
  return NextResponse.json(record, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(serviceRecords)
    .where(and(eq(serviceRecords.id, id), eq(serviceRecords.orgId, session.orgId)))
    .run()

  return NextResponse.json({ ok: true })
}
