'use client'

import { useState } from 'react'

const STYLES = `
  @keyframes arrowBounce {
    0%, 100% { transform: translateX(0); opacity: 0.4; }
    50%       { transform: translateX(5px); opacity: 1; }
  }
  .pricing-card {
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
  }
  .pricing-card:hover { transform: translateY(-8px); }
  .card-free:hover    { box-shadow: 0 20px 48px rgba(0,0,0,0.5); }
  .card-pro:hover     { box-shadow: 0 20px 60px rgba(200,146,60,0.28); border-color: #E0A84A !important; }
  .card-biz:hover     { box-shadow: 0 20px 60px rgba(200,146,60,0.18); border-color: #C8923C !important; }
  .card-bizpro:hover  { box-shadow: 0 20px 48px rgba(0,0,0,0.5); border-color: #3A3228 !important; }
  .tier-arrow         { animation: arrowBounce 1.8s ease-in-out infinite; display: inline-block; }
  .toggle-pill        { cursor: pointer; transition: background 0.15s, color 0.15s, border-color 0.15s; }
`

const APP_FREE_FEATURES = [
  '20 AI messages / day',
  'Basic dial-in assistant',
  'Espresso knowledge base',
  'Save up to 5 recipes',
]

const APP_PRO_FEATURES = [
  'Unlimited Ully AI messages',
  'Full espresso dial-in assistant',
  'Troubleshoot any equipment issue',
  'Unlimited recipe library',
  'Personal equipment tracker',
  'Barista skill tracking',
  'Weather-aware drink suggestions',
  'Priority AI responses',
]

const BIZ_FEATURES = [
  'Unlimited Ully AI for your whole team',
  'Equipment register & full service history',
  'Team management & invite system',
  'Weekly shift scheduling',
  'Inventory tracking with par-level alerts',
  'Revenue & expense logging',
  'Training log & skill tracking',
  'Unlimited team members',
  'Email support',
]

const BIZ_PRO_FEATURES = [
  'Everything in Business',
  'Multi-location dashboard',
  'POS integration — Square, Toast, Lightspeed',
  'QuickBooks expense sync',
  'Machine telemetry & shot data',
  'Custom AI on your recipes & SOPs',
  'Team performance analytics',
  'API access',
  'Priority support — 4-hour SLA',
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

function SectionLabel({ label, sub }: { label: string; sub: string }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 8 }}>
        {label}
      </div>
      <p style={{ fontSize: 14, color: '#6B5E52', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{sub}</p>
    </div>
  )
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      <style>{STYLES}</style>

      <section style={{ padding: 'clamp(80px,12vw,140px) clamp(24px,8vw,100px) clamp(60px,8vw,100px)' }}>

        {/* Billing toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 64 }}>
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

        {/* ── Section 1: Mobile App ─────────────────────────────────────── */}
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>
          <SectionLabel
            label="Ully AI — Mobile App"
            sub="For baristas and coffee enthusiasts. Dial-in, troubleshoot, and master your craft."
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap', justifyContent: 'flex-start', marginBottom: 80 }}>

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
                {APP_FREE_FEATURES.map(f => <EmptyItem key={f} text={f} />)}
              </ul>
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 10px', paddingTop: 130, flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div className="tier-arrow" style={{ fontSize: 18, color: '#C8923C' }}>→</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.14em', marginTop: 4, textTransform: 'uppercase' }}>upgrade</div>
              </div>
            </div>

            {/* Pro */}
            <div className="pricing-card card-pro" style={{ flex: '1 1 280px', maxWidth: 320, background: '#1C1712', border: '1px solid #C8923C', borderRadius: 4, padding: '32px 24px', position: 'relative' }}>
              <div style={{
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
                <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>
                  {annual ? '$4.99' : '$7.99'}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>/month</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', marginBottom: 28 }}>
                {annual ? 'Billed $59.99/year — 2 months free' : 'or $59.99/year — save 37%'}
              </p>
              <a href="/signup" style={{
                display: 'block', textAlign: 'center', marginBottom: 28,
                background: '#C8923C', color: '#0E0C0A', padding: '13px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Start Free Trial
              </a>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {APP_PRO_FEATURES.map(f => <CheckItem key={f} text={f} />)}
              </ul>
            </div>

          </div>

          {/* ── Divider ─────────────────────────────────────────────────── */}
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #1E1A17, transparent)', marginBottom: 80 }} />

          {/* ── Section 2: Business Platform ──────────────────────────── */}
          <SectionLabel
            label="Ully Business Platform"
            sub="For cafes and multi-location operators. Run your whole operation from one dashboard."
          />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, flexWrap: 'wrap', justifyContent: 'flex-start' }}>

            {/* Business */}
            <div className="pricing-card card-biz" style={{ flex: '1 1 280px', maxWidth: 320, background: '#1C1712', border: '1px solid #2A2218', borderRadius: 4, padding: '32px 24px', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Business</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>
                  {annual ? '$33' : '$49.99'}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>{annual ? '/loc/mo' : '/location/mo'}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', marginBottom: 28 }}>
                {annual ? 'Billed $399/location/year' : 'or $399/location/year — save 33%'}
              </p>
              <a href="/signup" style={{
                display: 'block', textAlign: 'center', marginBottom: 28,
                background: '#C8923C', color: '#0E0C0A', padding: '13px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Start Free Trial
              </a>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {BIZ_FEATURES.map(f => <CheckItem key={f} text={f} />)}
              </ul>
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', alignItems: 'flex-start', padding: '0 10px', paddingTop: 130, flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div className="tier-arrow" style={{ fontSize: 18, color: '#6B5E52', animationDelay: '0.4s' }}>→</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#3A3430', letterSpacing: '0.14em', marginTop: 4, textTransform: 'uppercase' }}>scale</div>
              </div>
            </div>

            {/* Business Pro */}
            <div className="pricing-card card-bizpro" style={{ flex: '1 1 280px', maxWidth: 320, background: '#1A1614', border: '1px solid #2A2218', borderRadius: 4, padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#6B5E52', marginBottom: 20 }}>Business Pro</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 700, color: 'white', letterSpacing: '-0.03em' }}>
                  {annual ? '$55' : '$79'}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>{annual ? '/loc/mo' : '/location/mo'}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', marginBottom: 28 }}>
                {annual ? 'Billed $659/location/year' : 'or $659/location/year — save 31%'}
              </p>
              <a href="mailto:support@ullycoffee.com" style={{
                display: 'block', textAlign: 'center', marginBottom: 28,
                border: '1px solid #2A2218', color: '#C4B8AA', padding: '11px', borderRadius: 3,
                fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Contact Us
              </a>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {BIZ_PRO_FEATURES.map(f => <CheckItem key={f} text={f} gold={f === 'Everything in Business'} />)}
              </ul>
            </div>

          </div>
        </div>

      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px,8vw,100px) clamp(24px,8vw,120px)', textAlign: 'center', borderTop: '1px solid #1E1A17' }}>
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
