'use client'

import { useState, useEffect, useRef } from 'react'

const STYLES = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes arrowBounce {
    0%, 100% { transform: translateX(0) scale(1); opacity: 0.4; }
    50%       { transform: translateX(5px) scale(1.15); opacity: 1; }
  }
  @keyframes goldPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(200,146,60,0); }
    50%       { box-shadow: 0 0 0 6px rgba(200,146,60,0.12); }
  }
  @keyframes badgeSlide {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pricing-card {
    opacity: 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .pricing-card.visible {
    animation: fadeInUp 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .pricing-card:hover {
    transform: translateY(-6px);
  }
  .card-free:hover     { box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
  .card-pro:hover      { box-shadow: 0 16px 56px rgba(200,146,60,0.22); animation: goldPulse 2s ease infinite; }
  .card-biz:hover      { box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
  .tier-arrow          { animation: arrowBounce 1.8s ease-in-out infinite; display: inline-block; }
  .badge-slide         { animation: badgeSlide 0.4s 0.3s ease both; }
  .toggle-pill {
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
`

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
  'Priority support — 4-hour SLA',
  'Custom AI on your recipes & SOPs',
  'Team performance analytics',
  'API access',
]

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return visible
}

function CheckItem({ text, gold }: { text: string; gold?: boolean }) {
  return (
    <li style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, flexShrink: 0, marginTop: 2,
        color: gold ? '#C8923C' : '#4A8C5C',
      }}>
        {gold ? '↑' : '✓'}
      </span>
      <span style={{
        fontSize: 13, lineHeight: 1.55,
        color: gold ? '#C8923C' : '#C4B8AA',
        fontWeight: gold ? 600 : 400,
      }}>{text}</span>
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
  const [annual, setAnnual] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const gridVisible = useInView(gridRef as React.RefObject<HTMLElement>)

  return (
    <>
      <style>{STYLES}</style>

      {/* ── Plans ──────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px,12vw,140px) clamp(24px,8vw,100px) clamp(60px,8vw,100px)' }}>

        {/* Billing toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 56 }}>
          <span
            className="toggle-pill"
            onClick={() => setAnnual(false)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '7px 18px', borderRadius: 99, border: '1px solid',
              borderColor: !annual ? '#C8923C' : '#1E1A17',
              background: !annual ? 'rgba(200,146,60,0.1)' : 'transparent',
              color: !annual ? '#C8923C' : '#4A4440',
            }}
          >
            Monthly
          </span>
          <span
            className="toggle-pill"
            onClick={() => setAnnual(true)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
              padding: '7px 18px', borderRadius: 99, border: '1px solid',
              borderColor: annual ? '#C8923C' : '#1E1A17',
              background: annual ? 'rgba(200,146,60,0.1)' : 'transparent',
              color: annual ? '#C8923C' : '#4A4440',
            }}
          >
            Annual
            <span style={{ marginLeft: 8, fontSize: 9, color: '#4A8C5C', fontWeight: 700 }}>2 MO FREE</span>
          </span>
        </div>

        {/* Cards + arrows */}
        <div ref={gridRef} style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap', justifyContent: 'center' }}>

          {/* ── Free ── */}
          <div
            className={`pricing-card card-free${gridVisible ? ' visible' : ''}`}
            style={{ animationDelay: '0ms', flex: '1 1 280px', maxWidth: 320, background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '36px 28px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 20 }}>Free</div>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>$0</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', marginBottom: 28 }}>After your 14-day Pro trial</p>
            <a href="/signup" style={{
              display: 'block', textAlign: 'center', marginBottom: 28,
              border: '1px solid #2A2218', color: '#6B5E52', padding: '11px',
              borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              transition: 'color 0.15s, border-color 0.15s',
            }}>
              Start Free Trial
            </a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <EmptyItem text="20 AI messages / day" />
              <EmptyItem text="Equipment (read-only)" />
              <EmptyItem text="Team & schedule (read-only)" />
              <EmptyItem text="Inventory (read-only)" />
              <EmptyItem text="Revenue (read-only)" />
            </ul>
          </div>

          {/* Arrow Free → Pro */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', marginTop: 140, flexShrink: 0, alignSelf: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="tier-arrow" style={{ fontSize: 18, color: '#C8923C', animationDelay: '0.2s' }}>→</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.14em', marginTop: 4, textTransform: 'uppercase' }}>upgrade</div>
            </div>
          </div>

          {/* ── Pro ── */}
          <div
            className={`pricing-card card-pro${gridVisible ? ' visible' : ''}`}
            style={{ animationDelay: '120ms', flex: '1 1 300px', maxWidth: 340, background: '#1C1712', border: '1px solid #C8923C', borderRadius: 4, padding: '36px 28px', position: 'relative' }}
          >
            <div className="badge-slide" style={{
              position: 'absolute', top: -1, left: 24,
              background: '#C8923C', color: '#0E0C0A',
              fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              padding: '4px 14px', borderRadius: '0 0 3px 3px',
            }}>
              Most popular
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Pro</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>
                {annual ? '$4.99' : '$7.99'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>/month</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', marginBottom: 28 }}>
              {annual ? 'Billed $59.99/year — 2 months free' : 'or $59.99/year — save 37%'}
            </p>
            <a href="/signup" style={{
              display: 'block', textAlign: 'center', marginBottom: 28,
              background: '#C8923C', color: '#0E0C0A', padding: '13px',
              borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10,
              fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Start Free Trial
            </a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {PRO_FEATURES.map(f => <CheckItem key={f} text={f} />)}
            </ul>
          </div>

          {/* Arrow Pro → Business */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px', marginTop: 140, flexShrink: 0, alignSelf: 'flex-start' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="tier-arrow" style={{ fontSize: 18, color: '#6B5E52', animationDelay: '0.5s' }}>→</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#3A3430', letterSpacing: '0.14em', marginTop: 4, textTransform: 'uppercase' }}>scale</div>
            </div>
          </div>

          {/* ── Business ── */}
          <div
            className={`pricing-card card-biz${gridVisible ? ' visible' : ''}`}
            style={{ animationDelay: '240ms', flex: '1 1 280px', maxWidth: 320, background: '#1A1614', border: '1px solid #2A2218', borderRadius: 4, padding: '36px 28px' }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6B5E52', marginBottom: 20 }}>Business</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>
                {annual ? '$33' : '$49.99'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>
                {annual ? '/loc/month' : '/location/mo'}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', marginBottom: 28 }}>
              {annual ? 'Billed $399/location/year' : 'or $399/location/year — save 33%'}
            </p>
            <a href="/signup" style={{
              display: 'block', textAlign: 'center', marginBottom: 28,
              border: '1px solid #2A2218', color: '#C4B8AA', padding: '11px',
              borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Start Free Trial
            </a>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {BUSINESS_FEATURES.map(f => <CheckItem key={f} text={f} gold={f === 'Everything in Pro'} />)}
            </ul>
          </div>

        </div>

        {/* Business Pro note */}
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', marginTop: 32, letterSpacing: '0.08em' }}>
          Multi-location Business Pro at $79/location/month —{' '}
          <a href="mailto:support@ullycoffee.com" style={{ color: '#6B5E52', textDecoration: 'none', borderBottom: '1px solid #2A2218' }}>contact us</a>
        </p>
      </section>


      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,8vw,120px)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 12 }}>
          Start your free trial today.
        </h2>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4A4440', letterSpacing: '0.1em', marginBottom: 36 }}>
          14-day full trial · No credit card required · Cancel anytime
        </p>
        <a href="/signup" style={{
          display: 'inline-block',
          background: '#C8923C', color: '#0E0C0A', padding: '14px 40px', borderRadius: 3,
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Get Started Free
        </a>
      </section>
    </>
  )
}
