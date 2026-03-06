import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getClaudeClient, buildSystemPrompt } from '@/lib/claude'
import { db } from '@/lib/db'
import { equipment, teamMembers, inventory } from '@/lib/schema'
import { eq, and, sql } from 'drizzle-orm'
import { organizations } from '@/lib/schema'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { message, history } = await req.json()

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const orgId = session.orgId

    // Fetch org context
    const org = db.select().from(organizations).where(eq(organizations.id, orgId)).get()

    const activeEquipment = db
      .select()
      .from(equipment)
      .where(and(eq(equipment.orgId, orgId), eq(equipment.status, 'active')))
      .all()

    const activeTeam = db
      .select({ cnt: sql<number>`count(*)` })
      .from(teamMembers)
      .where(and(eq(teamMembers.orgId, orgId), eq(teamMembers.status, 'active')))
      .get()

    const lowStock = db
      .select()
      .from(inventory)
      .where(
        and(
          eq(inventory.orgId, orgId),
          sql`par_level IS NOT NULL AND quantity <= par_level`
        )
      )
      .all()

    const equipmentList = activeEquipment.map(e =>
      [e.brand, e.model, e.name].filter(Boolean).join(' ') || e.name
    )

    const systemPrompt = buildSystemPrompt({
      orgName: org?.name ?? session.orgName,
      orgType: org?.type ?? 'cafe',
      equipmentList,
      teamCount: Number(activeTeam?.cnt ?? 0),
      lowStockItems: lowStock.map(i => `${i.name} (${i.quantity} ${i.unit})`),
    })

    // Build message history for Claude
    const claudeMessages = [
      ...(history ?? []).slice(-18).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const client = getClaudeClient()

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: claudeMessages,
    })

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (err) {
    console.error('[chat]', err)
    return NextResponse.json({ error: 'Chat failed' }, { status: 500 })
  }
}
