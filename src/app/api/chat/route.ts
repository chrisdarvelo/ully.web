export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { getClaudeClient, buildSystemPrompt, EMAIL_TOOL } from '@/lib/claude'
import type { OrgContext } from '@/lib/claude'
import { sendEmail, formatEmailBody } from '@/lib/email'
import { db } from '@/lib/db'
import {
  equipment,
  teamMembers,
  inventory,
  revenueRecords,
  expenseRecords,
  schedules,
  trainingLogs,
  organizations,
} from '@/lib/schema'
import { eq, and, gte, sum, sql } from 'drizzle-orm'
import type Anthropic from '@anthropic-ai/sdk'

// ── Data helpers ──────────────────────────────────────────────────────────────

function startOfMonth() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function nowPlusDays(n: number) {
  return Date.now() + n * 24 * 60 * 60 * 1000
}

// ── Route ─────────────────────────────────────────────────────────────────────

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
    const monthStart = startOfMonth()
    const sevenDaysFromNow = nowPlusDays(7)

    // ── Fetch all org data ────────────────────────────────────────────────────

    const org = db.select().from(organizations).where(eq(organizations.id, orgId)).get()

    const allEquipment = db.select().from(equipment).where(eq(equipment.orgId, orgId)).all()

    const allTeam = db.select().from(teamMembers).where(eq(teamMembers.orgId, orgId)).all()

    const allInventory = db.select().from(inventory).where(eq(inventory.orgId, orgId)).all()

    // Revenue this month — total
    const monthRevTotal = db
      .select({ total: sum(revenueRecords.amount) })
      .from(revenueRecords)
      .where(and(eq(revenueRecords.orgId, orgId), gte(revenueRecords.date, monthStart)))
      .get()

    // Revenue this month — by category
    const monthRevByCategory = db
      .select({
        category: revenueRecords.category,
        total: sum(revenueRecords.amount),
      })
      .from(revenueRecords)
      .where(and(eq(revenueRecords.orgId, orgId), gte(revenueRecords.date, monthStart)))
      .groupBy(revenueRecords.category)
      .all()

    // Expenses this month — total
    const monthExpTotal = db
      .select({ total: sum(expenseRecords.amount) })
      .from(expenseRecords)
      .where(and(eq(expenseRecords.orgId, orgId), gte(expenseRecords.date, monthStart)))
      .get()

    // Expenses this month — by category
    const monthExpByCategory = db
      .select({
        category: expenseRecords.category,
        total: sum(expenseRecords.amount),
      })
      .from(expenseRecords)
      .where(and(eq(expenseRecords.orgId, orgId), gte(expenseRecords.date, monthStart)))
      .groupBy(expenseRecords.category)
      .all()

    // Schedule — next 7 days (join with team member names)
    const upcomingSchedules = db
      .select({
        memberName: teamMembers.name,
        date: schedules.date,
        shiftStart: schedules.shiftStart,
        shiftEnd: schedules.shiftEnd,
        position: schedules.position,
      })
      .from(schedules)
      .innerJoin(teamMembers, eq(schedules.memberId, teamMembers.id))
      .where(
        and(
          eq(schedules.orgId, orgId),
          gte(schedules.date, Date.now()),
          sql`${schedules.date} <= ${sevenDaysFromNow}`
        )
      )
      .orderBy(schedules.date)
      .all()

    // Training — recent 10 sessions
    const recentTraining = db
      .select()
      .from(trainingLogs)
      .where(eq(trainingLogs.orgId, orgId))
      .orderBy(sql`${trainingLogs.date} DESC`)
      .limit(10)
      .all()

    // ── Build context ─────────────────────────────────────────────────────────

    const ctx: OrgContext = {
      orgName: org?.name ?? session.orgName,
      orgType: org?.type ?? 'cafe',
      orgEmail: org?.email,
      userName: session.name,
      userEmail: session.email,

      monthRevenue: Number(monthRevTotal?.total ?? 0),
      monthRevenueByCategory: monthRevByCategory.map(r => ({
        category: r.category,
        total: Number(r.total ?? 0),
      })),

      monthExpenses: Number(monthExpTotal?.total ?? 0),
      monthExpensesByCategory: monthExpByCategory.map(r => ({
        category: r.category,
        total: Number(r.total ?? 0),
      })),

      equipment: allEquipment.map(e => ({
        name: e.name,
        brand: e.brand,
        model: e.model,
        status: e.status,
        lastService: e.lastService,
        type: e.type,
      })),

      team: allTeam.map(m => ({
        name: m.name,
        role: m.role,
        email: m.email,
        status: m.status,
      })),

      inventory: allInventory.map(i => ({
        name: i.name,
        category: i.category,
        quantity: i.quantity,
        unit: i.unit,
        parLevel: i.parLevel,
      })),

      upcomingShifts: upcomingSchedules,

      recentTraining: recentTraining.map(t => ({
        memberName: t.memberName,
        date: t.date,
        topic: t.topic,
        score: t.score,
        trainer: t.trainer,
      })),
    }

    const systemPrompt = buildSystemPrompt(ctx)

    // ── Build Claude message history ──────────────────────────────────────────

    const claudeMessages: Anthropic.MessageParam[] = [
      ...(history ?? []).slice(-18).map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ]

    const client = getClaudeClient()

    // ── Stream with tool use support ──────────────────────────────────────────

    const encoder = new TextEncoder()

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // ── First Claude call ───────────────────────────────────────────────
          const stream1 = client.messages.stream({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1024,
            system: systemPrompt,
            tools: [EMAIL_TOOL],
            messages: claudeMessages,
          })

          // Stream text to client as it arrives
          for await (const chunk of stream1) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }

          const finalMsg = await stream1.finalMessage()

          // ── Handle email tool use ───────────────────────────────────────────
          if (finalMsg.stop_reason === 'tool_use') {
            const toolBlock = finalMsg.content.find(
              (b: Anthropic.ContentBlock): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
            )

            if (toolBlock && toolBlock.name === 'send_email') {
              const input = toolBlock.input as { to: string; subject: string; body: string }

              let toolResultText: string

              try {
                await sendEmail({
                  to: input.to,
                  subject: input.subject,
                  body: formatEmailBody(input.body, ctx.orgName),
                  replyTo: ctx.orgEmail ?? ctx.userEmail,
                })
                toolResultText = `Email sent successfully to ${input.to}.`
              } catch (err) {
                toolResultText = `Failed to send email: ${err instanceof Error ? err.message : 'unknown error'}`
              }

              // ── Second Claude call — confirmation response ─────────────────
              const stream2 = client.messages.stream({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 512,
                system: systemPrompt,
                tools: [EMAIL_TOOL],
                messages: [
                  ...claudeMessages,
                  { role: 'assistant' as const, content: finalMsg.content },
                  {
                    role: 'user' as const,
                    content: [
                      {
                        type: 'tool_result' as const,
                        tool_use_id: toolBlock.id,
                        content: toolResultText,
                      },
                    ],
                  },
                ],
              })

              for await (const chunk of stream2) {
                if (
                  chunk.type === 'content_block_delta' &&
                  chunk.delta.type === 'text_delta'
                ) {
                  controller.enqueue(encoder.encode(chunk.delta.text))
                }
              }
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
