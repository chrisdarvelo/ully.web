import Anthropic from '@anthropic-ai/sdk'

export function getClaudeClient() {
  const apiKey = process.env.CLAUDE_API_KEY
  if (!apiKey) throw new Error('CLAUDE_API_KEY is not set')
  return new Anthropic({ apiKey })
}

export interface OrgContext {
  orgName: string
  orgType: string
  equipmentList: string[]
  teamCount: number
  lowStockItems: string[]
}

export function buildSystemPrompt(ctx: OrgContext): string {
  const equipmentStr = ctx.equipmentList.length > 0
    ? ctx.equipmentList.join(', ')
    : 'none registered'

  const lowStockStr = ctx.lowStockItems.length > 0
    ? ctx.lowStockItems.join(', ')
    : 'none'

  return `You are Ully, an AI coffee business assistant for ${ctx.orgName} (${ctx.orgType}).

Business context:
- Organization: ${ctx.orgName}, Type: ${ctx.orgType}
- Equipment: ${equipmentStr}
- Active team members: ${ctx.teamCount}
- Low inventory alerts: ${lowStockStr}

You help coffee professionals with: equipment maintenance and troubleshooting, team management, inventory optimization, scheduling, revenue analysis, quality control, and operational best practices.

Guidelines:
- Keep responses concise and actionable
- Use bullet points for multi-step processes
- Reference specific equipment or team data when relevant
- Focus on the coffee and food service industry
- For equipment issues, ask about symptoms before diagnosing
- For business questions, give data-driven, practical advice`
}
