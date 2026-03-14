import { db } from '@/lib/db'
import { organizations } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export interface PlanCheckResult {
  allowed: boolean
  reason: string
}

export async function checkPlan(orgId: string): Promise<PlanCheckResult> {
  const org = db.select({
    plan: organizations.plan,
    planStatus: organizations.planStatus,
    trialEndsAt: organizations.trialEndsAt,
  }).from(organizations).where(eq(organizations.id, orgId)).get()

  if (!org) {
    return { allowed: false, reason: 'organization_not_found' }
  }

  const { plan, planStatus, trialEndsAt } = org

  // Free tier — always allowed
  if (plan === 'free') {
    return { allowed: true, reason: 'free' }
  }

  // Trial — allowed if not expired
  if (plan === 'trial') {
    if (trialEndsAt && trialEndsAt > Date.now()) {
      return { allowed: true, reason: 'trial_active' }
    }
    return { allowed: false, reason: 'subscription_required' }
  }

  // Paid plans — allowed if active
  if ((plan === 'business' || plan === 'bizpro') && planStatus === 'active') {
    return { allowed: true, reason: 'paid_active' }
  }

  // Cancelled or expired
  return { allowed: false, reason: 'subscription_required' }
}
