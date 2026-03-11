import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About — Ully' }

export default function AboutPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 56px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>About</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 20 }}>
          Built for the people<br />behind the coffee.
        </h1>
        <p style={{ fontSize: 17, color: '#C4B8AA', lineHeight: 1.6, maxWidth: 560 }}>
          Ully is an AI-powered operations platform for coffee professionals — from single-location cafes to multi-site roasters and distributors.
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>

        <div style={{ paddingBottom: 48, borderBottom: '1px solid #1E1A17', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            The Problem
          </h2>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 16 }}>
            Running a coffee business means juggling equipment maintenance, team scheduling, inventory, and financials — often across tools that don&apos;t talk to each other, or no tools at all.
          </p>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85 }}>
            Most software built for hospitality is bloated, expensive, and designed for chains — not for the independent operators who define specialty coffee.
          </p>
        </div>

        <div style={{ paddingBottom: 48, borderBottom: '1px solid #1E1A17', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            What Ully Does
          </h2>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 16 }}>
            Ully brings your operations into one place — equipment tracking, service records, team management, scheduling, inventory, and revenue reporting — with an AI assistant that actually understands your business context.
          </p>
          <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85 }}>
            Ask Ully about your maintenance backlog. Get shift coverage suggestions. Spot inventory gaps before they become problems. The AI reads your data so you don&apos;t have to explain it every time.
          </p>
        </div>

        <div style={{ paddingBottom: 48, borderBottom: '1px solid #1E1A17', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 18 }}>
            Our Principles
          </h2>
          {[
            ['Privacy first', 'Your business data is private by default. We never sell it, share it, or use it to train AI without explicit consent.'],
            ['No bloat', 'We build what coffee operators actually need. No feature roadmap driven by enterprise sales.'],
            ['Honest pricing', 'Flat per-location pricing. No seat fees, no surprise overages.'],
          ].map(([title, body]) => (
            <div key={title} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, padding: '20px 0', borderTop: '1px solid #1E1A17' }}>
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
