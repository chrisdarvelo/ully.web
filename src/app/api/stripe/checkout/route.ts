export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { stripe, PRICES, PriceKey } from '@/lib/stripe'
import { db } from '@/lib/db'
import { organizations } from '@/lib/schema'
import { eq } from 'drizzle-orm'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL!

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { priceKey } = await req.json() as { priceKey: PriceKey }

  if (!PRICES[priceKey]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const org = db.select().from(organizations).where(eq(organizations.id, session.orgId)).get()
  if (!org) return NextResponse.json({ error: 'Organization not found' }, { status: 404 })

  // Reuse existing Stripe customer or create new
  let customerId = org.stripeCustomerId ?? undefined
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.email,
      name: session.orgName,
      metadata: { orgId: session.orgId, userId: session.userId },
    })
    customerId = customer.id
    db.update(organizations)
      .set({ stripeCustomerId: customerId })
      .where(eq(organizations.id, session.orgId))
      .run()
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: PRICES[priceKey], quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { orgId: session.orgId },
    },
    success_url: `${APP_URL}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${APP_URL}/billing`,
    metadata: { orgId: session.orgId },
  })

  return NextResponse.json({ url: checkoutSession.url })
}
