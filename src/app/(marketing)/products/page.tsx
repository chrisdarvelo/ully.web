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

// Ground school → bar → certification
const CURRICULUM_MODULES = [
  {
    num: '02',
    name: 'Machine Systems',
    tag: 'Ground School',
    desc: 'Before you pull a shot, you understand the machine. Boilers, pumps, hydraulics, pressure systems, and electrical — every system explained from first principles, the way a pilot learns their instruments before takeoff.',
    points: [
      'HX, dual-boiler, single, and thermoblock architectures',
      'Full water circuit: inlet, pressure drop, gauge interpretation',
      'Electrical systems: heating elements, PID wiring, fuses, thermal cutouts',
      'Control boards: sensors, pressure transducers, relay logic',
    ],
  },
  {
    num: '03',
    name: 'Extraction Science',
    tag: 'Ground School → Bar',
    desc: 'Certified pilots read their instruments — they do not guess. This module builds the mental model that separates a barista who diagnoses from one who guesses: TDS, pressure, temperature, extraction yield.',
    points: [
      'Dial-in methodology: dose, yield, time, and the variables between them',
      'Reading your gauges: pressure, temperature, shot timer',
      'Channeling diagnosis — identify the cause, not just the symptom',
      'Water chemistry and its measurable effect on extraction',
    ],
  },
  {
    num: '04',
    name: 'Maintenance & Repair',
    tag: 'Bar',
    desc: 'Every certified pilot is responsible for keeping their machine in service. Preventive maintenance schedules, rebuild intervals, and step-by-step repair procedures for the most common failure points.',
    points: [
      'Pre-shift checklists: daily, weekly, monthly, and annual cadences',
      'Gasket replacement, backflush protocol, descaling, OPV calibration',
      'Solenoid cleaning, pump rebuild, and electrical fault tracing',
      'Diagnosing under service pressure — troubleshooting mid-rush',
    ],
  },
]

const CERT_MODULE = {
  num: '05',
  name: 'Test Prep & Certification',
  tag: 'Earn Your Wings — $150 one-time',
  desc: 'The final stage. Unlocked only after completing the Hero-Champion curriculum. Exclusive test prep material, a structured final assessment, and your official Barista Champion Certificate — your pilot\'s license for espresso.',
  points: [
    'Exclusive Test Prep material — final tier only, not available earlier',
    'Structured final assessment across all four curriculum modules',
    'Official Barista Champion Certificate on passing',
    'Permanent credential — yours to keep, independent of subscription',
    'Requires full completion of the apprentice curriculum',
  ],
}

const TOWER_MODULES = [
  {
    num: '06',
    name: 'Crew Management',
    tag: 'Control Tower',
    desc: 'Track every pilot on your team — their curriculum progress, skill level, certification status, and shift schedule. Know who is ready to fly solo and who needs more hours.',
    points: [
      'Full crew roster with roles, progress, and certification status',
      'Weekly shift planner across all staff',
      'Invite crew via secure codes — no admin overhead',
    ],
  },
  {
    num: '07',
    name: 'Fleet Register',
    tag: 'Control Tower',
    desc: 'A complete airworthiness register for every machine in your operation. Full service history, maintenance intervals, and overdue alerts — so no aircraft slips out of airworthiness.',
    points: [
      'Track make, model, serial number, and in-service date',
      'Log every service event: type, technician, cost, and date',
      'Instant visibility into what is current and what is overdue',
    ],
  },
  {
    num: '08',
    name: 'Operations Intelligence',
    tag: 'Control Tower',
    desc: 'Ully AI grounded in your real business data — revenue, inventory, team, and fleet — gives the owner answers, not dashboards. The kind of intelligence that keeps the operation flying.',
    points: [
      'Revenue and expense tracking with category-level detail',
      'Inventory with par-level alerts before you run low',
      'AI recommendations informed by your live operational data',
    ],
  },
]


export default function ProductsPage() {
  return (
    <>
      <style>{MODULE_CARD_STYLES}</style>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        borderBottom: '1px solid #1E1A17',
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200,146,60,0.06) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            Flight School
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24, color: 'white' }}>
            Ground school.<br />
            Flight deck.<br />
            <span style={{ color: '#C8923C' }}>Earn your wings.</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', color: '#C4B8AA', lineHeight: 1.7, maxWidth: 580, marginBottom: 40 }}>
            Aviation methodology applied to espresso mastery. Every barista starts in ground school — machine theory, systems, instrument reading. They advance to the flight deck. The best earn their wings as certified Barista Champions.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/signup" style={{
              background: '#C8923C', color: '#0E0C0A', padding: '13px 28px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
            }}>
              Start Flight School
            </a>
            <a href="/pricing" style={{
              border: '1px solid #2A2218', color: '#C4B8AA', padding: '13px 24px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
            }}>
              View Pricing →
            </a>
          </div>
        </div>
      </section>

      {/* ── Ully AI — The Copilot ────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17', background: '#0E0C0A' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
              01 — Ully AI
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'white', marginBottom: 20 }}>
              Your copilot.<br />Every shift.
            </h2>
            <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.75, marginBottom: 28 }}>
              Ully is the flight instructor in your ear during every service — machine-level vocabulary, specific numbers, direct diagnosis. Pre-flight checks, mid-rush squawks, post-shift debriefs. No hedging. Powered by Claude Sonnet.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Pre-shift check — what do I inspect before first pull?',
                'Solenoid not releasing pressure between shots',
                'Shot channeling badly — third attempt, same result',
                'Walk me through an OPV calibration procedure',
              ].map(q => (
                <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', marginTop: 2, flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#C4B8AA', lineHeight: 1.5 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal mock */}
          <div className="terminal-deco" style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 6, padding: '28px 32px', maxWidth: 440 }}>
            <div style={{ display: 'flex', gap: 7, marginBottom: 24 }}>
              {['#C84040', '#C89040', '#4A8C5C'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.1, color: '#C4B8AA' }}>
              <div><span style={{ color: '#6B5E52' }}>pilot</span> <span style={{ color: '#C8923C' }}>›</span> pre-shift check — boiler ready?</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Boiler at 93°C. Pressure nominal.</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Flush the group. Ready for first pull.</div>
              <div style={{ marginTop: 16 }}><span style={{ color: '#6B5E52' }}>pilot</span> <span style={{ color: '#C8923C' }}>›</span> solenoid not releasing between shots</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Classic three-way valve clog.</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Backflush with Cafiza — 5 cycles.</div>
              <div style={{ color: '#C89040', paddingLeft: 12 }}>If persists: disassemble and inspect.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ──────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Curriculum
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 14 }}>
              From ground school to flight deck.
            </h2>
            <p style={{ fontSize: 15, color: '#6B5E52', lineHeight: 1.7, maxWidth: 540 }}>
              The same structure aviation uses to build pilots — theory first, instruments second, maintenance third. No shortcuts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {CURRICULUM_MODULES.map(mod => (
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

      {/* ── Earn Your Wings ─────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17', background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,146,60,0.05) 0%, transparent 70%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Certification
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 14 }}>
              Earn your wings.
            </h2>
            <p style={{ fontSize: 15, color: '#6B5E52', lineHeight: 1.7, maxWidth: 520 }}>
              Complete the Hero-Champion curriculum. Unlock Test Prep. Pass the final assessment. Graduate as a certified Barista Champion.
            </p>
          </div>

          <div style={{ background: 'linear-gradient(135deg, #1C1A14 0%, #1A1610 60%, #1C1A14 100%)', border: '1px solid rgba(200,146,60,0.4)', borderRadius: 6, padding: '40px 36px', maxWidth: 720 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.16em' }}>{CERT_MODULE.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8923C', background: 'rgba(200,146,60,0.1)', padding: '3px 10px', borderRadius: 2, border: '1px solid rgba(200,146,60,0.3)' }}>
                {CERT_MODULE.tag}
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12, letterSpacing: '0.02em' }}>
              {CERT_MODULE.name}
            </h3>
            <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.7, marginBottom: 24 }}>
              {CERT_MODULE.desc}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {CERT_MODULE.points.map((p, i) => (
                <li key={p} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: i === 0 ? '#C8923C' : '#4A8C5C', flexShrink: 0, marginTop: 1 }}>
                    {i === 0 ? '★' : '✓'}
                  </span>
                  <span style={{ fontSize: 13, color: i === 0 ? '#C8923C' : '#C4B8AA', lineHeight: 1.55, fontWeight: i === 0 ? 600 : 400 }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Control Tower (Business Platform) ───────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Control Tower
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 14 }}>
              The owner&apos;s view<br />
              <span style={{ color: '#C8923C' }}>of the flight school.</span>
            </h2>
            <p style={{ fontSize: 15, color: '#6B5E52', lineHeight: 1.7, maxWidth: 580 }}>
              The web platform gives operators the full picture — which baristas are progressing through the curriculum, which machines need airworthiness checks, and what the operation needs next. Ully AI advises from both the cockpit and the tower. Included in Pro Annual.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {TOWER_MODULES.map(mod => (
              <div key={mod.num} className="mod-card" style={{ background: '#1A1614', padding: '32px 28px', borderRadius: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.16em' }}>{mod.num}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C8923C', background: 'rgba(200,146,60,0.08)', padding: '3px 8px', borderRadius: 2, border: '1px solid rgba(200,146,60,0.2)' }}>{mod.tag}</span>
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
    </>
  )
}
