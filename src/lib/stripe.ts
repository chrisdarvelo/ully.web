import Stripe from 'stripe'

function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2026-02-25.clover',
  })
}

// Lazy singleton — only instantiated on first API call, not at build time
let _stripe: Stripe | undefined
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop: string) {
    if (!_stripe) _stripe = getStripe()
    return (_stripe as unknown as Record<string, unknown>)[prop]
  },
})

// Price IDs — set these in Railway env after creating products in Stripe Dashboard
export const PRICES = {
  business_monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY!,
  business_annual: process.env.STRIPE_PRICE_BUSINESS_ANNUAL!,
  bizpro_monthly: process.env.STRIPE_PRICE_BIZPRO_MONTHLY!,
  bizpro_annual: process.env.STRIPE_PRICE_BIZPRO_ANNUAL!,
} as const

export type PriceKey = keyof typeof PRICES

export const PLAN_LABELS: Record<string, string> = {
  trial: '14-Day Free Trial',
  business: 'Business',
  bizpro: 'Business Pro',
  cancelled: 'Cancelled',
}
