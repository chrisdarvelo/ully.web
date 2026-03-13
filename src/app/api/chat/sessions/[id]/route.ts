export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { chatSessions } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

export const runtime = 'nodejs'

// GET — load full session including messages
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const row = db
    .select()
    .from(chatSessions)
    .where(and(eq(chatSessions.id, id), eq(chatSessions.userId, session.userId)))
    .get()

  if (!row) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json({
    ...row,
    messages: JSON.parse(row.messages),
  })
}

// PUT — update existing session (title + messages)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { title, messages } = await req.json()

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'messages are required' }, { status: 400 })
  }

  db.update(chatSessions)
    .set({
      title: title?.trim().slice(0, 100) ?? undefined,
      messages: JSON.stringify(messages),
      updatedAt: Date.now(),
    })
    .where(and(eq(chatSessions.id, id), eq(chatSessions.userId, session.userId)))
    .run()

  return NextResponse.json({ ok: true })
}
