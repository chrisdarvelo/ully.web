export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { invites } from '@/lib/schema'
import { eq, and } from 'drizzle-orm'

export const runtime = 'nodejs'

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 32 chars — power of 2, no modulo bias
  const bytes = new Uint8Array(8)
  crypto.getRandomValues(bytes)
  let code = ''
  for (let i = 0; i < 8; i++) {
    if (i === 4) code += '-'
    code += chars[bytes[i] % chars.length]
  }
  return code
}

// GET — list active invites for org
export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = db
    .select()
    .from(invites)
    .where(eq(invites.orgId, session.orgId))
    .all()

  return NextResponse.json(rows)
}

// POST — generate new invite code
export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (session.role !== 'owner' && session.role !== 'manager') {
    return NextResponse.json({ error: 'Only owners and managers can create invites' }, { status: 403 })
  }

  const { role } = await req.json()
  const inviteRole = role === 'manager' ? 'manager' : 'member'

  const id = crypto.randomUUID()
  const code = generateCode()
  const now = Date.now()
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000 // 7 days

  db.insert(invites).values({
    id,
    orgId: session.orgId,
    code,
    role: inviteRole,
    createdBy: session.userId,
    expiresAt,
    createdAt: now,
  }).run()

  return NextResponse.json({ id, code, role: inviteRole, expiresAt }, { status: 201 })
}

// DELETE — revoke an invite
export async function DELETE(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })

  db.delete(invites)
    .where(and(eq(invites.id, id), eq(invites.orgId, session.orgId)))
    .run()

  return NextResponse.json({ ok: true })
}

