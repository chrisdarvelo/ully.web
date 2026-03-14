export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { equipment, serviceRecords } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'
import { checkPlan } from '@/lib/plan-gate'

export const runtime = 'nodejs'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const plan = await checkPlan(session.orgId)
  if (!plan.allowed) return NextResponse.json({ error: 'Active subscription required.' }, { status: 402 })

  const items = db.select().from(equipment).where(eq(equipment.orgId, session.orgId)).all()
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const plan = await checkPlan(session.orgId)
  if (!plan.allowed) return NextResponse.json({ error: 'Active subscription required.' }, { status: 402 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { name, type, brand, model, serial, status, notes } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(equipment).values({
    id,
    orgId: session.orgId,
    name: name.trim(),
    type: type ?? 'other',
    brand: brand?.trim() || null,
    model: model?.trim() || null,
    serial: serial?.trim() || null,
    status: status ?? 'active',
    notes: notes?.trim() || null,
    createdAt: now,
  }).run()

  const item = db.select().from(equipment).where(eq(equipment.id, id)).get()
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id, name, type, brand, model, serial, status, notes } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.update(equipment)
    .set({
      name: name?.trim(),
      type,
      brand: brand?.trim() || null,
      model: model?.trim() || null,
      serial: serial?.trim() || null,
      status,
      notes: notes?.trim() || null,
    })
    .where(and(eq(equipment.id, id), eq(equipment.orgId, session.orgId)))
    .run()

  const item = db.select().from(equipment).where(eq(equipment.id, id)).get()
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  // Cascade: delete service records first, then equipment
  db.delete(serviceRecords).where(and(eq(serviceRecords.equipmentId, id), eq(serviceRecords.orgId, session.orgId))).run()
  db.delete(equipment).where(and(eq(equipment.id, id), eq(equipment.orgId, session.orgId))).run()
  return NextResponse.json({ ok: true })
}
