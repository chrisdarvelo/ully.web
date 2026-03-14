import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About — Ully' }

export default function AboutPage() {
  return (
    <>
      <div className="about-header" style={{ padding: '80px 48px 56px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>About</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 20 }}>
          Built for baristas<br />who want mastery.
        </h1>
        <p style={{ fontSize: 17, color: '#C4B8AA', lineHeight: 1.6, maxWidth: 560 }}>
          Ully is the professional training and AI platform for espresso machine mastery — the path from barista to certified Barista Champion.
        </p>
      </div>

      <div className="about-body" style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>

        <div style={{ paddingBottom: 48, borderBottom: '1px solid #1E1A17', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            The Problem
          </h2>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 16 }}>
            Most baristas learn to operate their machine. Very few learn to understand it. When something goes wrong — a pressure drop, a temperature swing, a solenoid fault — the answer is usually a $300 technician call and a machine down for hours.
          </p>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85 }}>
            The knowledge exists. It just isn&apos;t taught. There is no structured, accessible path from &ldquo;I can pull a shot&rdquo; to &ldquo;I understand every system on this machine.&rdquo;
          </p>
        </div>

        <div style={{ paddingBottom: 48, borderBottom: '1px solid #1E1A17', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            What Ully Is
          </h2>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 16 }}>
            A structured certification program and AI instructor built for baristas who want instrument-level machine knowledge — and for café owners who want to build that capability into their team.
          </p>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85 }}>
            The curriculum runs from espresso fundamentals to advanced machine systems, maintenance, and a final AI-evaluated certification examination. The AI copilot — Ully — is available during every shift for diagnosis, dial-in, and troubleshooting. The web platform gives owners visibility into their team&apos;s progress and their equipment&apos;s service status.
          </p>
        </div>

        <div style={{ paddingBottom: 48, borderBottom: '1px solid #1E1A17', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            Our Principles
          </h2>
          {[
            ['No shortcuts', 'The certification means something because it is hard to earn. AI-evaluated open-ended examination — not multiple choice, not trivia.'],
            ['Privacy first', 'Your business data is private by default. We never sell it, share it, or use it to train AI without explicit consent.'],
            ['Purpose-built', 'Every feature is designed for the coffee professional\'s workflow. Not adapted from generic SaaS.'],
            ['Honest pricing', 'Flat subscription pricing. No seat fees, no surprise overages. The certificate is a one-time purchase — yours to keep forever.'],
          ].map(([title, body]) => (
            <div key={title} className="about-grid" style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, padding: '20px 0', borderTop: '1px solid #1E1A17' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.06em', paddingTop: 2 }}>{title}</div>
              <div style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.75 }}>{body}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #1E1A17' }} />
        </div>

        <div>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            Contact
          </h2>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85 }}>
            Questions, feedback, or partnership inquiries —{' '}
            <a href="mailto:support@ullyapp.com" style={{ color: '#C8923C', textDecoration: 'none', borderBottom: '1px solid #6B4E1E' }}>
              support@ullyapp.com
            </a>
          </p>
        </div>

      </div>
    </>
  )
}
