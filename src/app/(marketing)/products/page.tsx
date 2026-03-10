import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Products' }

const MODULE_CARD_STYLES = `
  .mod-card {
    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
    border: 1px solid #1E1A17;
  }
  .mod-card:hover {
    transform: translateY(-6px);
    background: #201C18 !important;
    border-color: #C8923C !important;
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    z-index: 1;
    position: relative;
  }
`

const MODULES = [
  {
    num: '01',
    name: 'Ully AI',
    tag: 'Command Center',
    desc: 'The AI assistant that knows your entire operation. Ask anything — in plain language — and get instant, context-aware answers grounded in your real business data.',
    points: [
      'Powered by Claude Sonnet — the same model used by leading AI teams',
      'Reads your equipment, team, inventory, and revenue to answer in context',
      'Espresso dial-in, maintenance advice, and coffee expertise built in',
      'No dashboards to navigate. Just ask.',
    ],
    callout: 'No other platform in the coffee industry offers this.',
  },
  {
    num: '02',
    name: 'Equipment',
    tag: 'Asset Management',
    desc: 'A complete register of every machine in your operation — espresso machines, grinders, brewers, and more — with full service history attached.',
    points: [
      'Track make, model, serial number, and purchase date',
      'Log maintenance type, technician, and cost per service event',
      'AI-assisted service recommendations based on your machine history',
      'Instant visibility into what has been serviced and what is overdue',
    ],
  },
  {
    num: '03',
    name: 'Team',
    tag: 'Staff Management',
    desc: 'Your full team roster with roles, contact details, and skill tracking — all in one place.',
    points: [
      'Add team members with role, hourly rate, and contact info',
      'Invite staff via secure invite codes — no admin overhead',
      'View your team at a glance with active / inactive status',
      'Ask Ully who is available and get shift suggestions instantly',
    ],
  },
  {
    num: '04',
    name: 'Schedule',
    tag: 'Shift Planning',
    desc: 'A weekly shift planner built for cafe operations. Plan your week, adjust on the fly, and keep every shift covered.',
    points: [
      'Visual weekly calendar view across all staff',
      'Add, edit, and delete shifts with instant confirmation',
      'Role and shift-type tagging for quick reference',
      'Ask Ully AI who is working and when — no spreadsheets needed',
    ],
  },
  {
    num: '05',
    name: 'Inventory',
    tag: 'Stock Control',
    desc: 'Track your consumables, supplies, and green coffee with par-level alerts and real-time quantity visibility.',
    points: [
      'Add items with unit, quantity, par level, and supplier',
      'Visual low-stock indicators when quantity drops below par',
      'Category-based organisation for fast scanning',
      'Ask Ully what is running low before your next order',
    ],
  },
  {
    num: '06',
    name: 'Revenue & Expenses',
    tag: 'Financial Tracking',
    desc: 'Log daily revenue and categorise expenses without an accountant. Know your numbers before your bank statement does.',
    points: [
      'Daily revenue logging with location and note tagging',
      'Expense tracking by category: staff, supplies, equipment, rent',
      'Running totals and monthly summaries at a glance',
      'Ask Ully "what was our best month?" and get the answer instantly',
    ],
  },
  {
    num: '07',
    name: 'Training',
    tag: 'Team Development',
    desc: 'Log training sessions and track skill development across your team — from dial-in technique to latte art.',
    points: [
      'Record training type, staff member, and outcome',
      'Build an evidence-based picture of team capability over time',
      'Use Ully AI to generate training plans tailored to your team',
      'Build an auditable record of team capability over time',
    ],
  },
]


export default function ProductsPage() {
  return (
    <>
      <style>{MODULE_CARD_STYLES}</style>
      {/* Hero */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        borderBottom: '1px solid #1E1A17',
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,146,60,0.06) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            Platform
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24, color: 'white' }}>
            Seven capabilities.<br />
            <span style={{ color: '#C8923C' }}>One AI that connects them all.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#C4B8AA', lineHeight: 1.7, maxWidth: 560, marginBottom: 40 }}>
            Built for cafe operators who are tired of switching between tools, losing context, and spending
            time on admin instead of coffee. Every module feeds one AI that knows your whole operation.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/signup" style={{
              background: '#C8923C', color: '#0E0C0A', padding: '13px 28px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              Start Free Trial
            </a>
            <a href="/pricing" style={{
              border: '1px solid #1E1A17', color: '#C4B8AA', padding: '13px 24px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
            }}>
              View Pricing →
            </a>
          </div>
        </div>
      </section>

      {/* AI callout — featured */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17', background: '#0E0C0A' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
              01 — AI Command Center
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'white', marginBottom: 20 }}>
              Ask. Don&apos;t navigate.
            </h2>
            <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.75, marginBottom: 28 }}>
              Every other platform makes you click through menus and build reports to answer basic questions.
              Ully lets you ask in plain language and get the answer immediately — grounded in your real business data.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Which machine is due for service?',
                'What was our highest-revenue day last month?',
                'Who is working the opening shift Saturday?',
                'We\'re low on oat milk — how much did we order last time?',
              ].map(q => (
                <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', marginTop: 2, flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C4B8AA', lineHeight: 1.5 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal mock */}
          <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 6, padding: '28px 32px', maxWidth: 440 }}>
            <div style={{ display: 'flex', gap: 7, marginBottom: 24 }}>
              {['#C84040', '#C89040', '#4A8C5C'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.1, color: '#C4B8AA' }}>
              <div><span style={{ color: '#6B5E52' }}>you</span> <span style={{ color: '#C8923C' }}>›</span> Which machine needs service soonest?</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Your La Marzocco Linea PB.</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Last service: 94 days ago (group head gaskets).</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Recommended interval: 90 days. <span style={{ color: '#C89040' }}>Overdue.</span></div>
              <div style={{ marginTop: 16 }}><span style={{ color: '#6B5E52' }}>you</span> <span style={{ color: '#C8923C' }}>›</span> What was our best revenue day in Feb?</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Feb 14 — $3,240.</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>28% above your Feb daily average.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              All Modules
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white' }}>
              Everything included. One price.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {MODULES.slice(1).map(mod => (
              <div key={mod.num} className="mod-card" style={{ background: '#1A1614', padding: '32px 28px', borderRadius: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.16em' }}>{mod.num}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B5E52', background: '#0E0C0A', padding: '3px 8px', borderRadius: 2 }}>{mod.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 10, letterSpacing: '0.02em' }}>
                  {mod.name}
                </h3>
                <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.7, marginBottom: 20 }}>
                  {mod.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {mod.points.map(p => (
                    <li key={p} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A8C5C', flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: 13, color: '#C4B8AA', lineHeight: 1.5 }}>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 16 }}>
          Ready to run a smarter operation?
        </h2>
        <p style={{ fontSize: 16, color: '#C4B8AA', marginBottom: 36 }}>
          14-day free trial. No credit card required.
        </p>
        <a href="/signup" style={{
          display: 'inline-block',
          background: '#C8923C', color: '#0E0C0A', padding: '14px 36px', borderRadius: 3,
          fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          Start Free Trial
        </a>
      </section>
    </>
  )
}
