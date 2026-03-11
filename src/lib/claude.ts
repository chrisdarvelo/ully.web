import Anthropic from '@anthropic-ai/sdk'

export function getClaudeClient() {
  const apiKey = process.env.CLAUDE_API_KEY
  if (!apiKey) throw new Error('CLAUDE_API_KEY is not set')
  return new Anthropic({ apiKey })
}

// ── Data shapes ───────────────────────────────────────────────────────────────

export interface EquipmentCtx {
  name: string
  brand?: string | null
  model?: string | null
  status: string
  lastService?: number | null
  type: string
}

export interface TeamMemberCtx {
  name: string
  role: string
  email?: string | null
  status: string
}

export interface InventoryCtx {
  name: string
  category: string
  quantity: number
  unit: string
  parLevel?: number | null
}

export interface ScheduleShiftCtx {
  memberName: string
  date: number
  shiftStart: string
  shiftEnd: string
  position?: string | null
}

export interface TrainingCtx {
  memberName: string
  date: number
  topic: string
  score?: number | null
  trainer?: string | null
}

export interface RevenueCategoryCtx {
  category: string
  total: number
}

export interface ExpenseCategoryCtx {
  category: string
  total: number
}

export interface OrgContext {
  // Identity
  orgName: string
  orgType: string
  orgEmail?: string | null
  userName: string
  userEmail: string

  // Revenue
  monthRevenue: number
  monthRevenueByCategory: RevenueCategoryCtx[]

  // Expenses
  monthExpenses: number
  monthExpensesByCategory: ExpenseCategoryCtx[]

  // Equipment
  equipment: EquipmentCtx[]

  // Team
  team: TeamMemberCtx[]

  // Inventory
  inventory: InventoryCtx[]

  // Schedule — next 7 days
  upcomingShifts: ScheduleShiftCtx[]

  // Training — recent
  recentTraining: TrainingCtx[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function currentMonthLabel() {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// ── System prompt ─────────────────────────────────────────────────────────────

export function buildSystemPrompt(ctx: OrgContext): string {
  const month = currentMonthLabel()

  // Revenue section
  const revTotal = formatCurrency(ctx.monthRevenue)
  const revByCategory = ctx.monthRevenueByCategory.length > 0
    ? ctx.monthRevenueByCategory.map(c => `  - ${c.category}: ${formatCurrency(c.total)}`).join('\n')
    : '  - No revenue recorded this month'

  // Expenses section
  const expTotal = formatCurrency(ctx.monthExpenses)
  const expByCategory = ctx.monthExpensesByCategory.length > 0
    ? ctx.monthExpensesByCategory.map(c => `  - ${c.category}: ${formatCurrency(c.total)}`).join('\n')
    : '  - No expenses recorded this month'

  const netProfit = ctx.monthRevenue - ctx.monthExpenses
  const netLabel = netProfit >= 0
    ? `+${formatCurrency(netProfit)} profit`
    : `${formatCurrency(netProfit)} loss`

  // Equipment section
  const equipmentLines = ctx.equipment.length > 0
    ? ctx.equipment.map(e => {
        const name = [e.brand, e.model, e.name].filter(Boolean).join(' ')
        const svc = e.lastService ? `last service ${formatDate(e.lastService)}` : 'no service logged'
        const status = e.status === 'maintenance' ? '⚠ MAINTENANCE' : e.status === 'retired' ? '✕ retired' : '✓ active'
        return `  - ${name} [${status}] — ${svc}`
      }).join('\n')
    : '  - No equipment registered'

  // Team section
  const activeTeam = ctx.team.filter(m => m.status === 'active')
  const teamLines = activeTeam.length > 0
    ? activeTeam.map(m => {
        const emailStr = m.email ? ` <${m.email}>` : ''
        return `  - ${m.name}${emailStr} — ${m.role}`
      }).join('\n')
    : '  - No active team members'

  // Inventory section
  const lowStock = ctx.inventory.filter(i => i.parLevel != null && i.quantity <= i.parLevel)
  const okStock = ctx.inventory.filter(i => i.parLevel == null || i.quantity > i.parLevel)
  const inventoryLines = [
    ...lowStock.map(i => `  ⚠ LOW: ${i.name} — ${i.quantity} ${i.unit} (par: ${i.parLevel} ${i.unit})`),
    ...okStock.map(i => `  - ${i.name} — ${i.quantity} ${i.unit}`),
  ].join('\n') || '  - No inventory items'

  // Schedule section
  const scheduleLines = ctx.upcomingShifts.length > 0
    ? (() => {
        const byDay: Record<string, string[]> = {}
        for (const s of ctx.upcomingShifts) {
          const day = new Date(s.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
          if (!byDay[day]) byDay[day] = []
          byDay[day].push(`${s.memberName} (${s.shiftStart}–${s.shiftEnd}${s.position ? `, ${s.position}` : ''})`)
        }
        return Object.entries(byDay).map(([day, shifts]) => `  ${day}: ${shifts.join(', ')}`).join('\n')
      })()
    : '  - No shifts scheduled in the next 7 days'

  // Training section
  const trainingLines = ctx.recentTraining.length > 0
    ? ctx.recentTraining.slice(0, 8).map(t => {
        const score = t.score ? ` (score: ${t.score}/5)` : ''
        const trainer = t.trainer ? ` — trainer: ${t.trainer}` : ''
        return `  - ${formatDate(t.date)}: ${t.memberName} — ${t.topic}${score}${trainer}`
      }).join('\n')
    : '  - No training sessions logged'

  return `You are Ully, the AI business assistant for ${ctx.orgName} (${ctx.orgType}).
You are speaking with ${ctx.userName} (${ctx.userEmail}).

## IMPORTANT — Live Business Data
Never ask the user to re-enter data that is already shown below. Reference it directly in your answers.

### Revenue — ${month}
  Total: ${revTotal}
${revByCategory}
  Net: ${netLabel}

### Expenses — ${month}
  Total: ${expTotal}
${expByCategory}

### Equipment (${ctx.equipment.length} items)
${equipmentLines}

### Team (${activeTeam.length} active members)
${teamLines}

### Inventory (${ctx.inventory.length} items)
${inventoryLines}

### Schedule — Next 7 Days
${scheduleLines}

### Recent Training
${trainingLines}

## Email Capability
You can send emails on behalf of ${ctx.userName}. When the user asks you to send an email:
1. Identify or ask for the recipient address if not clear (team member emails are listed above)
2. Compose a professional email
3. Confirm the recipient, subject, and content with the user before calling send_email
4. After sending, confirm it was delivered

## Formatting rules
- Plain text only. No markdown. No bold (**text**), no headers (###), no tables, no code blocks.
- No emojis. Ever.
- No filler phrases like "Great question!" or "Anything else?" — just answer.
- Use simple dashes for lists if needed. Keep responses short and direct.`
}

// ── Email tool definition ─────────────────────────────────────────────────────

export const EMAIL_TOOL: Anthropic.Tool = {
  name: 'send_email',
  description: `Send an email on behalf of the user.
Only call this tool after the user explicitly asks to send an email and you have confirmed the recipient, subject, and content.
Do not call this without the user's clear intent to send.`,
  input_schema: {
    type: 'object' as const,
    properties: {
      to: {
        type: 'string',
        description: 'Recipient email address',
      },
      subject: {
        type: 'string',
        description: 'Email subject line',
      },
      body: {
        type: 'string',
        description: 'Plain text email body. Write a professional, complete email.',
      },
    },
    required: ['to', 'subject', 'body'],
  },
}
