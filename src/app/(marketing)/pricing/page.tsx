import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pricing' }

const PRO_FEATURES = [
  'Unlimited Ully AI messages',
  'Equipment & service records',
  'Team management & invite system',
  'Weekly shift scheduling',
  'Inventory tracking with par-level alerts',
  'Revenue & expense logging',
  'Training log',
  'Unlimited team members',
  'Email support',
]

const BUSINESS_FEATURES = [
  'Everything in Pro',
  'Multi-location dashboard (coming soon)',
  'POS integration — Square, Toast, Lightspeed',
  'QuickBooks expense sync',
  'Machine telemetry & shot data',
  'Priority support with 4-hour SLA',
  'Custom AI training on your recipes & SOPs',
  'Team performance analytics',
  'API access',
]

const FAQ = [
  {
    q: 'What happens after the 14-day trial?',
    a: 'You choose a plan or stay on Free — which gives you 20 AI messages per day and read access to your data. Nothing is deleted. No credit card is required to start.',
  },
  {
    q: 'How does per-location pricing work for Business?',
    a: '$24.99 per location per month. A single-location cafe is $24.99. A 10-location group is $249.90/month — with one unified AI that knows all your sites.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. No contracts, no cancellation fees. Cancel from your settings page and your plan reverts to Free at the end of the billing period.',
  },
  {
    q: 'Do you offer annual billing?',
    a: 'Yes. Annual Pro is $79/year — two months free vs monthly. Annual Business pricing is available on request.',
  },
  {
    q: 'Is there a plan for individual baristas or home users?',
    a: 'The Ully AI mobile app (iOS + Android) is designed for individual coffee professionals and enthusiasts. The web platform is built for cafe businesses. Both use the same AI engine.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        borderBottom: '1px solid #1E1A17',
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,146,60,0.05) 0%, transparent 70%)',
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
          Pricing
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20, color: 'white' }}>
          Simple. No per-module fees.
        </h1>
        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#C4B8AA', maxWidth: 500, margin: '0 auto 16px' }}>
          Other platforms charge you separately for scheduling, equipment, and inventory.
          Ully includes everything in one price.
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52', letterSpacing: '0.08em' }}>
          14-day full trial · No credit card required · Cancel anytime
        </p>
      </section>

      {/* Plans */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'start' }}>

          {/* Free */}
          <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '36px 32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B5E52', marginBottom: 20 }}>Free</div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>$0</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52', marginBottom: 32 }}>After your 14-day Pro trial</p>
            <a href="/signup" style={{
              display: 'block', textAlign: 'center',
              border: '1px solid #1E1A17', color: '#C4B8AA', padding: '12px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
              marginBottom: 32,
            }}>
              Start Free Trial
            </a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['20 AI messages / day', 'Equipment (read-only)', 'Team & schedule (read-only)', 'Inventory (read-only)', 'Revenue (read-only)'].map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', flexShrink: 0, marginTop: 1 }}>○</span>
                  <span style={{ fontSize: 13, color: '#6B5E52', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro — featured */}
          <div style={{ background: '#1A1614', border: '1px solid #C8923C', borderRadius: 4, padding: '36px 32px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -1, left: 24, background: '#C8923C', color: '#0E0C0A', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '0 0 3px 3px' }}>
              Most popular
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Pro</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>$9.99</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52' }}>/month</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C8923C', marginBottom: 32 }}>or $79/year — 2 months free</p>
            <a href="/signup" style={{
              display: 'block', textAlign: 'center',
              background: '#C8923C', color: '#0E0C0A', padding: '13px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
              marginBottom: 32,
            }}>
              Start Free Trial
            </a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PRO_FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A8C5C', flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontSize: 13, color: '#C4B8AA', lineHeight: 1.5 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business */}
          <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '36px 32px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B5E52', marginBottom: 20 }}>Business</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>$24.99</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52' }}>/location/mo</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52', marginBottom: 32 }}>Billed monthly per location</p>
            <a href="/signup" style={{
              display: 'block', textAlign: 'center',
              border: '1px solid #1E1A17', color: '#C4B8AA', padding: '12px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
              marginBottom: 32,
            }}>
              Start Free Trial
            </a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {BUSINESS_FEATURES.map(f => (
                <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: f === 'Everything in Pro' ? '#C8923C' : '#4A8C5C', flexShrink: 0, marginTop: 1 }}>
                    {f === 'Everything in Pro' ? '↑' : '✓'}
                  </span>
                  <span style={{ fontSize: 13, color: f === 'Everything in Pro' ? '#C8923C' : '#C4B8AA', lineHeight: 1.5, fontWeight: f === 'Everything in Pro' ? 600 : 400 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* Competitor context */}
      <section style={{ padding: 'clamp(40px, 6vw, 80px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '40px 48px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            Why Ully?
          </div>
          <h3 style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700, color: 'white', lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.01em' }}>
            Competitors charge $79/month for one module. Ully charges $79/year for everything.
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { label: 'Legacy platform — equipment only', price: '$79–199/mo', note: 'Per module. No AI.' },
              { label: 'Legacy platform — cafe telemetry', price: '$149+/mo', note: 'Requires IoT hardware purchase.' },
              { label: 'Ully Pro — full platform', price: '$79/year', note: 'Everything. AI included.' },
            ].map(item => (
              <div key={item.label} style={{ padding: '20px 0', borderTop: '1px solid #1E1A17' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52', marginBottom: 8, lineHeight: 1.4 }}>{item.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: item.label.startsWith('Ully') ? '#C8923C' : '#C4B8AA', marginBottom: 4 }}>{item.price}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 40 }}>
            FAQ
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {FAQ.map((item, i) => (
              <div key={item.q} style={{ padding: '28px 0', borderTop: i === 0 ? 'none' : '1px solid #1E1A17' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 12, lineHeight: 1.4 }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 16 }}>
          Start your free trial today.
        </h2>
        <p style={{ fontSize: 16, color: '#C4B8AA', marginBottom: 36 }}>
          Full Pro access for 14 days. No credit card required.
        </p>
        <a href="/signup" style={{
          display: 'inline-block',
          background: '#C8923C', color: '#0E0C0A', padding: '14px 36px', borderRadius: 3,
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Get Started Free
        </a>
      </section>
    </>
  )
}
