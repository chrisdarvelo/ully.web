'use client'

const STYLES = `
  @keyframes arrowBounce {
    0%, 100% { transform: translateX(0); opacity: 0.4; }
    50%       { transform: translateX(5px); opacity: 1; }
  }
  @keyframes certGlow {
    0%, 100% { box-shadow: 0 0 32px rgba(200,146,60,0.15); }
    50%       { box-shadow: 0 0 56px rgba(200,146,60,0.35); }
  }
  .pricing-card {
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .pricing-card:hover { transform: translateY(-8px); }
  .card-free:hover    { box-shadow: 0 20px 48px rgba(0,0,0,0.5); }
  .card-pro:hover     { box-shadow: 0 20px 60px rgba(200,146,60,0.22); border-color: #C8923C !important; }
  .card-annual:hover  { box-shadow: 0 20px 60px rgba(200,146,60,0.38); border-color: #E0A84A !important; }
  .tier-arrow         { animation: arrowBounce 1.8s ease-in-out infinite; display: inline-block; }
  .cert-card          { animation: certGlow 3s ease-in-out infinite; }
`

const FREE_FEATURES = [
  '20 AI copilot messages / day',
  'Ground school — module 1 access',
  'Core espresso knowledge base',
  'Save up to 5 recipes',
]

const PRO_FEATURES = [
  'Unlimited Ully AI copilot',
  'Full barista curriculum — all tiers',
  'Machine systems & hydraulics',
  'Extraction science & dial-in',
  'Maintenance & repair training',
  'Equipment troubleshooting guides',
  'Unlimited recipe logbook',
  'Personal equipment tracker',
  'Priority AI responses',
]

const ANNUAL_FEATURES = [
  'Everything in Pro',
  'Control Tower — full business platform',
  'Crew management & shift scheduling',
  'Equipment register & service history',
  'Inventory with par-level alerts',
  'Revenue & expense intelligence',
  'Training logs & certification tracking',
  'Unlimited crew members',
]

function CheckItem({ text, gold }: { text: string; gold?: boolean }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, flexShrink: 0, marginTop: 2, color: gold ? '#C8923C' : '#4A8C5C' }}>
        {gold ? '↑' : '✓'}
      </span>
      <span style={{ fontSize: 13, lineHeight: 1.55, color: gold ? '#C8923C' : '#C4B8AA', fontWeight: gold ? 600 : 400 }}>{text}</span>
    </li>
  )
}

function EmptyItem({ text }: { text: string }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#2E2A27', flexShrink: 0, marginTop: 2 }}>○</span>
      <span style={{ fontSize: 13, color: '#4A4440', lineHeight: 1.55 }}>{text}</span>
    </li>
  )
}

export default function PricingPage() {
  return (
    <>
      <style>{STYLES}</style>

      <section style={{ padding: 'clamp(80px,12vw,140px) clamp(24px,8vw,100px) clamp(60px,8vw,100px)' }}>

        {/* Header */}
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 56, textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Flight School — Pricing
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'white', marginBottom: 14 }}>
              Choose your flight plan.
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#6B5E52', letterSpacing: '0.06em', maxWidth: 480, margin: '0 auto' }}>
              Start in ground school. Earn your wings when you&apos;re ready.
            </p>
          </div>

          {/* 3-card row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* Free */}
            <div className="pricing-card card-free" style={{ flex: '1 1 260px', maxWidth: 300, background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 20 }}>Free</div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>$0</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', marginBottom: 28 }}>Always free</p>
              <a href="/signup" style={{
                display: 'block', textAlign: 'center', marginBottom: 28,
                border: '1px solid #2A2218', color: '#6B5E52', padding: '11px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Download Free
              </a>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {FREE_FEATURES.map(f => <EmptyItem key={f} text={f} />)}
              </ul>
            </div>

            {/* Arrow 1 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 10px', paddingTop: 130, flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div className="tier-arrow" style={{ fontSize: 18, color: '#C8923C' }}>→</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.14em', marginTop: 4, textTransform: 'uppercase' }}>upgrade</div>
              </div>
            </div>

            {/* Pro Monthly */}
            <div className="pricing-card card-pro" style={{ flex: '1 1 270px', maxWidth: 310, background: '#1C1712', border: '1px solid #2A2218', borderRadius: 4, padding: '32px 24px', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>$7.99</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>/month</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', marginBottom: 28 }}>
                Billed monthly
              </p>
              <a href="/signup" style={{
                display: 'block', textAlign: 'center', marginBottom: 28,
                background: '#C8923C', color: '#0E0C0A', padding: '13px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Start Free Trial
              </a>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {PRO_FEATURES.map(f => <CheckItem key={f} text={f} />)}
              </ul>
            </div>

            {/* Arrow 2 */}
            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 10px', paddingTop: 130, flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div className="tier-arrow" style={{ fontSize: 18, color: '#C8923C', animationDelay: '0.4s' }}>→</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.14em', marginTop: 4, textTransform: 'uppercase' }}>best value</div>
              </div>
            </div>

            {/* Pro Annual */}
            <div className="pricing-card card-annual" style={{ flex: '1 1 290px', maxWidth: 330, background: '#1C1712', border: '1px solid #C8923C', borderRadius: 4, padding: '32px 24px', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: -1, left: 24,
                background: '#C8923C', color: '#0E0C0A',
                fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                padding: '4px 14px', borderRadius: '0 0 3px 3px',
              }}>
                Most popular
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Pro Annual</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>$79</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>/year</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', marginBottom: 28 }}>
                2 months free — vs monthly
              </p>
              <a href="/signup" style={{
                display: 'block', textAlign: 'center', marginBottom: 28,
                background: '#C8923C', color: '#0E0C0A', padding: '13px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Start Free Trial
              </a>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {ANNUAL_FEATURES.map((f, i) => <CheckItem key={f} text={f} gold={i === 0} />)}
              </ul>
            </div>

          </div>

          {/* ── Certificate ──────────────────────────────────────────────── */}
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #1E1A17, transparent)', margin: '80px 0' }} />

          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 12 }}>
              Graduation
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'white', marginBottom: 14 }}>
              Become a Certified Barista Champion.
            </h2>
            <p style={{ fontSize: 14, color: '#6B5E52', fontFamily: 'var(--font-mono)', lineHeight: 1.7, letterSpacing: '0.04em' }}>
              Unlocked after completing the Hero-Champion curriculum. One-time purchase.
            </p>
          </div>

          <div className="cert-card" style={{
            maxWidth: 680, margin: '0 auto',
            background: 'linear-gradient(135deg, #1C1A14 0%, #1A1610 60%, #1C1A14 100%)',
            border: '1px solid rgba(200,146,60,0.5)',
            borderRadius: 6, padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ flex: '1 1 280px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
                  Barista Champion Certificate
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 52, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>$150</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>one-time</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', marginBottom: 28, letterSpacing: '0.04em' }}>
                  Unlocked at Hero-Champion tier
                </p>
                <a href="/signup" style={{
                  display: 'inline-block', textAlign: 'center',
                  background: '#C8923C', color: '#0E0C0A', padding: '13px 32px', borderRadius: 3,
                  fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
                }}>
                  Start the Journey →
                </a>
              </div>

              <div style={{ flex: '1 1 240px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Exclusive Test Prep material — final tier only',
                    'Structured final assessment',
                    'Official Barista Champion Certificate',
                    'Permanent credential — yours to keep',
                    'Requires completion of all 4 curriculum tiers',
                  ].map((f, i) => (
                    <li key={f} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i === 0 ? '#C8923C' : '#4A8C5C', flexShrink: 0, marginTop: 2 }}>
                        {i === 0 ? '★' : '✓'}
                      </span>
                      <span style={{ fontSize: 13, lineHeight: 1.55, color: i === 0 ? '#C8923C' : '#C4B8AA', fontWeight: i === 0 ? 600 : 400 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  )
}
