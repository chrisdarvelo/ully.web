import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

const PRINCIPLES = [
  {
    label: 'AI-native from day one',
    body: 'We didn\'t bolt an AI chatbot onto an existing platform. Ully was designed from the start around the premise that you should be able to ask any question about your operation and get an intelligent, grounded answer.',
  },
  {
    label: 'Unified, not siloed',
    body: 'Legacy platforms charge you per module. You get one price for one tool that does everything — because your equipment data and your team data and your revenue data should all be in the same place, visible to the same AI.',
  },
  {
    label: 'Built for the field',
    body: 'The person who needs information most is the one standing in front of the machine at 6am. Not a manager in a back office. Ully is mobile-first, fast, and available when it matters.',
  },
  {
    label: 'Honest about what we don\'t do yet',
    body: 'We don\'t do roast profiling. We don\'t do machine telemetry hardware. We don\'t do farm-to-roaster supply chain. Yet. The roadmap is public and the roadmap is honest — we\'re building toward the full supply chain one layer at a time.',
  },
]

const TIMELINE = [
  { year: '2025', event: 'Ully AI mobile app built. Coffee-only AI assistant for baristas and enthusiasts.' },
  { year: 'Jan 2026', event: 'Ully Business Platform web app built. Equipment, team, schedule, inventory, revenue, AI — all in one.' },
  { year: 'Mar 2026', event: 'Platform deployed on Railway. Open for early access signups.' },
  { year: 'Mid 2026', event: 'Multi-location dashboard, POS integration, machine telemetry — shipping.' },
  { year: '2027+', event: 'Roaster intelligence, green coffee sourcing, supply chain traceability.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        borderBottom: '1px solid #1E1A17',
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,146,60,0.05) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            About
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24, color: 'white' }}>
            The AI platform<br />
            <span style={{ color: '#C8923C' }}>the industry has been waiting for.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#C4B8AA', lineHeight: 1.7, maxWidth: 580 }}>
            Ully is built by a working coffee professional who got tired of managing an operation
            across five different apps, two spreadsheets, and a stack of paper service records.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
              The Problem
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'white', marginBottom: 24 }}>
              Coffee operations are fragmented. The tools are worse than the problem.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              'Your team schedule lives in Google Sheets or a whiteboard.',
              'Your machine service history is in a notebook, or an email thread, or nowhere.',
              'Your inventory is a gut feeling and a quick walk to the fridge.',
              'Your revenue is in your POS, your expenses are in your bank account, and nobody has reconciled them this quarter.',
              'Your "AI" assistant — if you have one — knows nothing about your specific operation.',
            ].map(line => (
              <div key={line} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#C84040', flexShrink: 0, marginTop: 2 }}>—</span>
                <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.65, margin: 0 }}>{line}</p>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: '20px 24px', background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 3 }}>
              <p style={{ fontSize: 15, color: 'white', lineHeight: 1.65, margin: 0, fontWeight: 600 }}>
                The incumbent platforms — built for enterprise roasters with dedicated IT teams —
                charge hundreds of dollars a month per module and take weeks to learn.
                They were never designed for the owner-operator running a three-location cafe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Our Approach
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white' }}>
              Four principles we don&apos;t compromise on.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.label} style={{ background: '#1A1614', padding: '36px 32px', borderRight: '1px solid #1E1A17', borderBottom: '1px solid #1E1A17' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.16em', marginBottom: 16 }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 14, lineHeight: 1.4 }}>
                  {p.label}
                </h3>
                <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.75, margin: 0 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 40 }}>
            Timeline
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE.map((t, i) => (
              <div key={t.year} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32, padding: '28px 0', borderTop: i === 0 ? 'none' : '1px solid #1E1A17' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C8923C', letterSpacing: '0.1em', paddingTop: 2 }}>
                  {t.year}
                </div>
                <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.7, margin: 0 }}>{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17', background: '#0E0C0A' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            The Vision
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'white', marginBottom: 24 }}>
            From the cup to the farm. Every link in the chain.
          </h2>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#C4B8AA', lineHeight: 1.75, marginBottom: 20 }}>
            We start with cafes because that&apos;s where coffee meets the consumer and where operational friction
            is highest. But the long-term vision is a connected intelligence platform spanning the entire supply chain:
            roasters, green coffee buyers, importers, exporters, and farms.
          </p>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#C4B8AA', lineHeight: 1.75 }}>
            Every professional in every link of that chain deserves the same thing: expert-level answers
            grounded in their real data, available the moment they need it.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 16 }}>
          Come build the future of coffee operations with us.
        </h2>
        <p style={{ fontSize: 15, color: '#C4B8AA', marginBottom: 36 }}>
          14-day free trial. No credit card required. Cancel anytime.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/signup" style={{
            display: 'inline-block',
            background: '#C8923C', color: '#0E0C0A', padding: '13px 32px', borderRadius: 3,
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            Get Started
          </a>
          <a href="/products" style={{
            display: 'inline-block',
            border: '1px solid #1E1A17', color: '#C4B8AA', padding: '13px 24px', borderRadius: 3,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            See Products →
          </a>
        </div>
      </section>
    </>
  )
}
