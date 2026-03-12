export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { organizations } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import type { Plan, PlanStatus } from '@/lib/schema'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

function planFromPriceId(priceId: string): Plan {
  const bizpro = [
    process.env.STRIPE_PRICE_BIZPRO_MONTHLY,
    process.env.STRIPE_PRICE_BIZPRO_ANNUAL,
  ]
  return bizpro.includes(priceId) ? 'bizpro' : 'business'
}

function statusFromStripe(status: Stripe.Subscription['status']): PlanStatus {
  switch (status) {
    case 'active': return 'active'
    case 'trialing': return 'trialing'
    case 'past_due': return 'past_due'
    default: return 'cancelled'
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const sub = (event.data.object as Stripe.Subscription)

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const orgId = sub.metadata?.orgId
      if (!orgId) break

      const priceId = sub.items.data[0]?.price?.id
      const plan = planFromPriceId(priceId)
      const planStatus = statusFromStripe(sub.status)

      db.update(organizations)
        .set({
          stripeSubscriptionId: sub.id,
          plan,
          planStatus,
          trialEndsAt: sub.trial_end ? sub.trial_end * 1000 : null,
        })
        .where(eq(organizations.id, orgId))
        .run()
      break
    }

    case 'customer.subscription.deleted': {
      const orgId = sub.metadata?.orgId
      if (!orgId) break

      db.update(organizations)
        .set({ plan: 'cancelled', planStatus: 'cancelled', stripeSubscriptionId: null })
        .where(eq(organizations.id, orgId))
        .run()
      break
    }
  }

  return NextResponse.json({ received: true })
}
