export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { chatSessions } from '@/lib/schema'
import { eq, and, desc } from 'drizzle-orm'

export const runtime = 'nodejs'

// GET — list sessions for current user (summary only, no messages)
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = db
    .select({
      id: chatSessions.id,
      title: chatSessions.title,
      createdAt: chatSessions.createdAt,
      updatedAt: chatSessions.updatedAt,
    })
    .from(chatSessions)
    .where(and(
      eq(chatSessions.orgId, session.orgId),
      eq(chatSessions.userId, session.userId)
    ))
    .orderBy(desc(chatSessions.updatedAt))
    .limit(50)
    .all()

  return NextResponse.json(rows)
}

// POST — save a new session
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { title, messages } = await req.json()
  if (!title?.trim() || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'title and messages are required' }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const now = Date.now()

  db.insert(chatSessions).values({
    id,
    orgId: session.orgId,
    userId: session.userId,
    title: title.trim().slice(0, 100),
    messages: JSON.stringify(messages),
    createdAt: now,
    updatedAt: now,
  }).run()

  return NextResponse.json({ id }, { status: 201 })
}

// DELETE — delete a session
export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(chatSessions)
    .where(and(eq(chatSessions.id, id), eq(chatSessions.userId, session.userId)))
    .run()

  return NextResponse.json({ ok: true })
}
