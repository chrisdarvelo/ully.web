'use client'

import { useEffect, useState } from 'react'

interface BillingInfo {
  plan: string
  planStatus: string
  trialEndsAt: number | null
  stripeCustomerId: string | null
}

const PLAN_LABELS: Record<string, string> = {
  trial: '14-Day Free Trial',
  business: 'Business',
  bizpro: 'Business Pro',
  cancelled: 'Cancelled',
}

const STATUS_COLOR: Record<string, string> = {
  trialing: '#C8923C',
  active: '#4A8C5C',
  past_due: '#C84040',
  cancelled: '#6B5E52',
}

const PLANS = [
  {
    key: 'business_monthly' as const,
    label: 'Business',
    price: '$49.99',
    period: '/month',
    features: ['Unlimited Ully AI for your team', 'Equipment & service history', 'Team management', 'Scheduling & inventory', 'Revenue tracking'],
  },
  {
    key: 'business_annual' as const,
    label: 'Business Annual',
    price: '$33',
    period: '/month',
    badge: 'Save 33%',
    features: ['Everything in Business', 'Billed $399/location/year'],
  },
  {
    key: 'bizpro_monthly' as const,
    label: 'Business Pro',
    price: '$79',
    period: '/month',
    features: ['Everything in Business', 'Multi-location', 'POS integration', 'API access', 'Priority support'],
  },
]

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/billing').then(r => r.json()).then(d => {
      setBilling(d)
      setLoading(false)
    })
  }, [])

  async function openPortal() {
    setPortalLoading(true)
    const res = await fetch('/api/stripe/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setPortalLoading(false)
  }

  async function startCheckout(priceKey: string) {
    setCheckoutLoading(priceKey)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceKey }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    setCheckoutLoading(null)
  }

  const daysLeft = billing?.trialEndsAt
    ? Math.max(0, Math.ceil((billing.trialEndsAt - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <div style={{ padding: '40px 48px', maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 32 }}>
        Billing
      </h1>

      {/* Current plan card */}
      <div style={{ background: '#1A1614', border: '1px solid #2A2218', borderRadius: 4, padding: '24px 28px', marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B5E52', marginBottom: 12 }}>
          Current Plan
        </div>

        {loading ? (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#4A4440' }}>Loading...</div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>
                  {PLAN_LABELS[billing?.plan ?? 'trial'] ?? billing?.plan}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: 99,
                  background: `${STATUS_COLOR[billing?.planStatus ?? 'trialing']}22`,
                  color: STATUS_COLOR[billing?.planStatus ?? 'trialing'],
                  border: `1px solid ${STATUS_COLOR[billing?.planStatus ?? 'trialing']}44`,
                }}>
                  {billing?.planStatus ?? 'trialing'}
                </span>
              </div>
              {billing?.plan === 'trial' && daysLeft !== null && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C8923C' }}>
                  {daysLeft} day{daysLeft !== 1 ? 's' : ''} remaining in trial
                </div>
              )}
            </div>

            {billing?.stripeCustomerId && (
              <button
                onClick={openPortal}
                disabled={portalLoading}
                style={{
                  background: 'none', border: '1px solid #2A2218', borderRadius: 3,
                  padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: '#C4B8AA', letterSpacing: '0.14em', textTransform: 'uppercase',
                  cursor: portalLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {portalLoading ? 'Opening...' : 'Manage Billing →'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Plan selection — shown when on trial or cancelled */}
      {(billing?.plan === 'trial' || billing?.plan === 'cancelled') && (
        <>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B5E52', marginBottom: 20 }}>
            Choose a Plan
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {PLANS.map(plan => (
              <div
                key={plan.key}
                style={{
                  flex: '1 1 240px', maxWidth: 280,
                  background: '#1A1614', border: '1px solid #2A2218', borderRadius: 4,
                  padding: '24px 20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C' }}>
                    {plan.label}
                  </div>
                  {plan.badge && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A8C5C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: 'white' }}>{plan.price}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', marginLeft: 4 }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', display: 'flex', gap: 8 }}>
                      <span style={{ color: '#4A8C5C', flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => startCheckout(plan.key)}
                  disabled={checkoutLoading === plan.key}
                  style={{
                    width: '100%', background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3,
                    padding: '11px', fontFamily: 'var(--font-mono)', fontSize: 10,
                    fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                    cursor: checkoutLoading === plan.key ? 'not-allowed' : 'pointer',
                    opacity: checkoutLoading === plan.key ? 0.6 : 1,
                  }}
                >
                  {checkoutLoading === plan.key ? 'Redirecting...' : 'Subscribe →'}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
