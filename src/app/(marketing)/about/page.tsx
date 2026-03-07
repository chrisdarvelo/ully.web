import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About' }

// ─── PHOTO INSTRUCTIONS ───────────────────────────────────────────────────────
// Place your photo at: /public/images/founder.jpg  (create the public/ dir if missing)
// Recommended: square crop, min 600×600px, JPG or WebP
// Then replace the placeholder <div> below with:
//   <img src="/images/founder.jpg" alt="[Your Name]"
//     style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 3 }} />
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 8vw, 120px) clamp(60px, 8vw, 100px)',
        borderBottom: '1px solid #1E1A17',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,146,60,0.06) 0%, transparent 70%)',
      }}>
        <div style={{ maxWidth: 680 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            About
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'white', marginBottom: 24 }}>
            Built by someone who<br />
            <span style={{ color: '#C8923C' }}>lived the problem.</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#C4B8AA', lineHeight: 1.7 }}>
            Ully was not built in a boardroom. It was built after years of working
            in cafes, diagnosing espresso machines, and managing operations held together
            by spreadsheets, group chats, and institutional memory that walked out the door
            every time someone quit.
          </p>
        </div>
      </section>

      {/* ── Founder ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'start' }}>

          {/* Photo */}
          <div style={{ position: 'sticky', top: 80 }}>
            {/* ── PHOTO PLACEHOLDER — replace this div with <img> when ready ── */}
            <div style={{
              width: '100%',
              aspectRatio: '1 / 1',
              maxWidth: 420,
              background: '#1A1614',
              border: '1px dashed rgba(200,146,60,0.3)',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="15" r="7" stroke="#C8923C" strokeWidth="1.5" opacity="0.4" />
                <path d="M6 36c0-7.7 6.3-14 14-14s14 6.3 14 14" stroke="#C8923C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
              </svg>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A4440', textAlign: 'center' }}>
                Add founder photo<br />
                <span style={{ fontSize: 9, color: '#2A2218' }}>/public/images/founder.jpg</span>
              </div>
            </div>

            {/* Name card */}
            <div style={{ marginTop: 24, padding: '20px 24px', background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 3 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                {/* ── REPLACE with your name ── */}
                Chris Darvelo
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', letterSpacing: '0.1em', marginBottom: 12 }}>
                {/* ── REPLACE with your title ── */}
                Espresso Technician · Founder, Ully AI
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  /* ── REPLACE with your credentials / affiliations ── */
                  'Coffee Technicians Guild',
                  'Specialty Coffee Association',
                  'World of Coffee — San Diego 2026',
                ].map(c => (
                  <div key={c} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C' }}>—</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Story */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

            {/* Background */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
                Background
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
                  {/* ── PERSONALISE this paragraph with your story ── */}
                  I started in coffee behind the bar — pulling shots, dialling in grinders,
                  learning that espresso is part science, part instinct, and completely
                  unforgiving when either is off. That hands-on foundation is what drives
                  everything Ully does.
                </p>
                <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
                  {/* ── PERSONALISE: years as technician, types of equipment, notable clients/accounts ── */}
                  Over time I moved into equipment — servicing and maintaining espresso machines
                  across independent specialty cafes and multi-location groups. Group head rebuilds,
                  boiler flushes, pump replacements, volumetric calibration — the full spectrum.
                  That shift gave me a different vantage point: I could see the whole operation,
                  not just one bar.
                </p>
                <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
                  {/* ── PERSONALISE: add specific certifications, SCA credentials, notable achievements ── */}
                  Working across dozens of accounts, I saw the same problems repeated at every
                  site regardless of size: no centralised service history, team schedules in
                  WhatsApp, inventory managed by gut feel, and financial data scattered across
                  three different apps that never talked to each other.
                </p>
              </div>
            </div>

            {/* The moment */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
                Why I Built Ully
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
                  {/* ── PERSONALISE: the specific moment / incident that triggered the build ── */}
                  The moment that broke it for me: showing up to service a machine and not being
                  able to find any record of its last service. The cafe owner couldn&apos;t find it
                  either. The previous technician had left. The history was gone — and we were
                  flying blind on a machine that had been having intermittent pressure issues
                  for weeks.
                </p>
                <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
                  That&apos;s a fixable problem. Not with a spreadsheet and not with a $200/month
                  enterprise platform that takes three weeks to set up. With something fast,
                  intelligent, and built for the way this industry actually works.
                </p>
                <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
                  So I built Ully. A platform where you can ask, in plain language, &quot;when was
                  this machine last serviced?&quot; and get an answer in two seconds — because the
                  history is there, attached to the machine, accessible from your phone.
                </p>
              </div>
            </div>

            {/* Blockquote */}
            <div style={{
              padding: '28px 32px',
              borderLeft: '2px solid #C8923C',
              background: 'rgba(200,146,60,0.04)',
            }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: 'white', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
                &ldquo;The coffee industry runs on expert knowledge passed mouth-to-mouth.
                Ully is what happens when you put that knowledge in a platform that never
                forgets, never clocks out, and is always one question away.&rdquo;
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', letterSpacing: '0.1em', marginTop: 16 }}>
                — Chris Darvelo, Founder
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Career timeline ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 40 }}>
            Career
          </div>

          {/* ── REPLACE / ADD entries to match your actual career ── */}
          {[
            {
              period: '2026 — Present',
              role: 'Founder',
              org: 'Ully AI',
              detail: 'Building the AI-powered operations platform for coffee professionals. Launched at World of Coffee San Diego.',
            },
            {
              period: '20XX — 20XX',
              role: 'Espresso Technician',
              org: '[ Your Company / Freelance ]',
              detail: 'Serviced and maintained commercial espresso equipment across independent specialty cafes and multi-site operations. Full-spectrum maintenance: group heads, boilers, pumps, volumetrics.',
              placeholder: true,
            },
            {
              period: '20XX — 20XX',
              role: 'Head Barista / [ Your Role ]',
              org: '[ Cafe or Group ]',
              detail: 'Front-of-house specialty coffee, team training, equipment calibration, and opening-shift dialling.',
              placeholder: true,
            },
            {
              period: '20XX',
              role: 'SCA / CTG Certification',
              org: 'Specialty Coffee Association · Coffee Technicians Guild',
              detail: '[ Add your specific certifications — SCA Barista Skills, Brewing, Q Grader, CTG L1/L2, etc. ]',
              placeholder: true,
            },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32,
              padding: '28px 0',
              borderTop: i === 0 ? 'none' : '1px solid #1E1A17',
              opacity: item.placeholder ? 0.55 : 1,
            }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C8923C', letterSpacing: '0.08em', lineHeight: 1.5 }}>
                  {item.period}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 2 }}>{item.role}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', letterSpacing: '0.08em', marginBottom: 10 }}>{item.org}</div>
                <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 64, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
              Vision
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'white' }}>
              From the cafe<br />to the farm.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
              Ully starts with cafes because that&apos;s where I&apos;ve spent my career and where
              the operational gap is sharpest. But the vision is a connected intelligence
              layer spanning the entire coffee supply chain — roasters, green coffee buyers,
              importers, exporters, and farms.
            </p>
            <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
              Every professional in every link of that chain deserves the same thing:
              expert-level answers grounded in their real data, available the moment they
              need it — not after a Google search, not after calling a consultant, not after
              scrolling through a notebook trying to find the last time they descaled the boiler.
            </p>
            <p style={{ fontSize: 16, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
              That&apos;s what I&apos;m building. One platform. One AI. The whole chain.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.01em', color: 'white', marginBottom: 16 }}>
          Try the platform I wish I&apos;d had.
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
            Get Started Free
          </a>
          <a href="/products" style={{
            display: 'inline-block',
            border: '1px solid #1E1A17', color: '#C4B8AA', padding: '13px 24px', borderRadius: 3,
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', textDecoration: 'none',
          }}>
            See All Features →
          </a>
        </div>
      </section>
    </>
  )
}
