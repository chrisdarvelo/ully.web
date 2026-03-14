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

const CURRICULUM_MODULES = [
  {
    num: '01',
    name: 'Espresso Fundamentals',
    tag: 'Foundation',
    descColor: '#6EAB7E',
    desc: 'Start with the science behind the shot. Understand what is happening inside the cup before you touch the machine — flavor development, roast chemistry, brewing variables, and sensory calibration.',
    points: [
      'Flavor wheel: identifying taste, acidity, body, and finish',
      'Roast profiles: light, medium, dark and their extraction behavior',
      'Brewing science: dose, yield, time, and the variables between them',
      'Water chemistry and its measurable effect on extraction',
      'Sensory calibration: tasting with intention, not guessing',
    ],
  },
  {
    num: '02',
    name: 'Machine Instruments',
    tag: 'Systems',
    descColor: '#F5D040',
    desc: 'Before you diagnose a problem, you understand the machine. Every gauge, every system, every component — explained from first principles so you know what you are reading and why it matters.',
    points: [
      'Gauge reading: pressure, temperature, shot timer interpretation',
      'Hydraulics: full water circuit, inlet pressure, pressure drop under load',
      'Electronics: heating elements, PID wiring, fuses, thermal cutouts',
      'Boiler architectures: HX, dual-boiler, single, and thermoblock',
      'Control boards: sensors, pressure transducers, relay logic',
    ],
  },
  {
    num: '03',
    name: 'Troubleshoot & Maintenance',
    tag: 'Bar',
    descColor: '#E05555',
    desc: 'Ully walks you through step-by-step. Using the camera and AI diagnosis, identify the problem, follow the procedure, and keep the machine in service. Preventive schedules, fault tracing, and hands-on repair.',
    points: [
      'Computer vision-assisted diagnosis — point and identify',
      'Daily, weekly, monthly, and annual maintenance cadences',
      'Gasket replacement, backflush protocol, descaling, OPV calibration',
      'Solenoid cleaning, pump rebuild, and electrical fault tracing',
      'Diagnosing under service pressure — troubleshooting mid-rush',
    ],
  },
]

const TOWER_MODULES = [
  {
    num: '04',
    name: 'Crew Management',
    tag: 'Control Tower',
    desc: 'Track every barista on your team — their curriculum progress, skill level, certification status, and shift schedule. Know who is ready to run the machine solo and who needs more training.',
    points: [
      'Full crew roster with roles, progress, and certification status',
      'Weekly shift planner across all staff',
      'Invite crew via secure codes — no admin overhead',
    ],
  },
  {
    num: '05',
    name: 'Fleet Register',
    tag: 'Control Tower',
    desc: 'A complete service register for every machine in your operation. Full maintenance history, service intervals, and overdue alerts — so nothing gets missed.',
    points: [
      'Track make, model, serial number, and in-service date',
      'Log every service event: type, technician, cost, and date',
      'Instant visibility into what is current and what is overdue',
    ],
  },
  {
    num: '06',
    name: 'Operations Intelligence',
    tag: 'Control Tower',
    desc: 'Ully AI grounded in your real business data — revenue, inventory, team, and fleet — gives the owner answers, not dashboards. Intelligence that keeps your operation running at full capacity.',
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
            The Curriculum
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 24, color: 'white' }}>
            Master your craft.<br />
            <span style={{ color: '#C8923C' }}>Earn your wings.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(12px, 1.2vw, 14px)', color: '#C4B8AA', lineHeight: 1.9, maxWidth: 580, marginBottom: 40, letterSpacing: '0.03em' }}>
            A structured certification program for espresso mastery. Every barista starts with the fundamentals — flavor science, machine systems, extraction. They advance to hands-on bar work. The best earn their wings as certified Barista Champions.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="/signup" style={{
              background: '#C8923C', color: '#0E0C0A', padding: '13px 28px', borderRadius: 3,
              fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block',
            }}>
              Start the Course
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

      {/* ── Curriculum ──────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Curriculum
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 14 }}>
              From the first shot to the final assessment.
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#C4B8AA', lineHeight: 1.9, maxWidth: 540, letterSpacing: '0.03em' }}>
              Theory first. Machine systems second. Hands-on repair third. The same structure used to build professionals in any high-stakes craft. No shortcuts.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {CURRICULUM_MODULES.map(mod => (
              <div key={mod.num} className="mod-card" style={{ background: '#1A1614', padding: '32px 28px', borderRadius: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.16em' }}>{mod.num}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C4B8AA', background: '#0E0C0A', padding: '3px 8px', borderRadius: 2 }}>{mod.tag}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 10, letterSpacing: '0.02em' }}>
                  {mod.name}
                </h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: mod.descColor, lineHeight: 1.85, marginBottom: 20, letterSpacing: '0.02em' }}>
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

      {/* ── Control Tower (Business Platform) ───────────────────────── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>
              Control Tower
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 14 }}>
              The business owner&apos;s view<br />
              <span style={{ color: '#C4B8AA' }}>of the training program.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#6EAB7E', lineHeight: 1.9, maxWidth: 580, letterSpacing: '0.03em' }}>
              The web platform gives operators the full picture — which baristas are progressing through the curriculum, which machines are due for service, and what the operation needs next. Ully AI advises both the barista at the bar and the owner at the desk. Included in Pro Annual.
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
