export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { revenueRecords, expenseRecords } from '@/lib/schema'
import { eq, and, desc } from 'drizzle-orm'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const type = req.nextUrl.searchParams.get('type')

  if (type === 'expenses') {
    const items = db
      .select()
      .from(expenseRecords)
      .where(eq(expenseRecords.orgId, session.orgId))
      .orderBy(desc(expenseRecords.date))
      .all()
    return NextResponse.json(items)
  }

  const items = db
    .select()
    .from(revenueRecords)
    .where(eq(revenueRecords.orgId, session.orgId))
    .orderBy(desc(revenueRecords.date))
    .all()
  return NextResponse.json(items)
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const { type, date, amount, category, description, paymentMethod, vendor } = body

  if (!amount || Number(amount) <= 0) {
    return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const now = Date.now()
  const recordDate = date ?? now

  if (type === 'expense') {
    db.insert(expenseRecords).values({
      id,
      orgId: session.orgId,
      date: recordDate,
      amount: Number(amount),
      category: category ?? 'other',
      vendor: vendor?.trim() || null,
      description: description?.trim() || null,
      createdAt: now,
    }).run()

    const item = db.select().from(expenseRecords).where(eq(expenseRecords.id, id)).get()
    return NextResponse.json(item, { status: 201 })
  }

  db.insert(revenueRecords).values({
    id,
    orgId: session.orgId,
    date: recordDate,
    amount: Number(amount),
    category: category ?? 'other',
    description: description?.trim() || null,
    paymentMethod: paymentMethod?.trim() || null,
    createdAt: now,
  }).run()

  const item = db.select().from(revenueRecords).where(eq(revenueRecords.id, id)).get()
  return NextResponse.json(item, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!['owner', 'manager'].includes(session.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id, type } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  if (type === 'expense') {
    db.delete(expenseRecords).where(and(eq(expenseRecords.id, id), eq(expenseRecords.orgId, session.orgId))).run()
  } else {
    db.delete(revenueRecords).where(and(eq(revenueRecords.id, id), eq(revenueRecords.orgId, session.orgId))).run()
  }

  return NextResponse.json({ ok: true })
}
