import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { inventory } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const items = db.select().from(inventory).where(eq(inventory.orgId, session.orgId)).all()
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, category, quantity, unit, parLevel, costPerUnit, supplier, sku } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(inventory).values({
    id,
    orgId: session.orgId,
    name: name.trim(),
    category: category ?? 'other',
    quantity: Number(quantity ?? 0),
    unit: unit ?? 'units',
    parLevel: parLevel ? Number(parLevel) : null,
    costPerUnit: costPerUnit ? Number(costPerUnit) : null,
    supplier: supplier?.trim() || null,
    sku: sku?.trim() || null,
    updatedAt: now,
    createdAt: now,
  }).run()

  const item = db.select().from(inventory).where(eq(inventory.id, id)).get()
  return NextResponse.json(item, { status: 201 })
}

export async function PUT(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, name, category, quantity, unit, parLevel, costPerUnit, supplier, sku } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.update(inventory)
    .set({
      name: name?.trim(),
      category,
      quantity: Number(quantity ?? 0),
      unit,
      parLevel: parLevel ? Number(parLevel) : null,
      costPerUnit: costPerUnit ? Number(costPerUnit) : null,
      supplier: supplier?.trim() || null,
      sku: sku?.trim() || null,
      updatedAt: Date.now(),
    })
    .where(and(eq(inventory.id, id), eq(inventory.orgId, session.orgId)))
    .run()

  const item = db.select().from(inventory).where(eq(inventory.id, id)).get()
  return NextResponse.json(item)
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(inventory).where(and(eq(inventory.id, id), eq(inventory.orgId, session.orgId))).run()
  return NextResponse.json({ ok: true })
}
