'use client'

import { useEffect, useRef } from 'react'

interface Props {
  loggedIn: boolean
}

function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

const token = {
  bg: '#0E0C0A',
  card: '#1A1614',
  cardHover: '#221E1A',
  gold: '#C8923C',
  goldDim: 'rgba(200, 146, 60, 0.15)',
  line: '#1E1A17',
  muted: '#4A4440',
  subtle: '#C4B8AA',
  mono: "'Menlo', 'Monaco', 'Courier New', monospace",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
}

export default function LandingPage({ loggedIn }: Props) {
  useFadeUp()

  return (
    <div style={{ background: token.bg, color: 'white', fontFamily: token.sans, overflowX: 'hidden' }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
        background: 'rgba(14, 12, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${token.line}`,
      }}>
        <span style={{ fontFamily: token.mono, fontSize: 14, fontWeight: 700, color: token.gold, letterSpacing: '0.3em' }}>
          ULLY
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {loggedIn ? (
            <a href="/dashboard" style={{
              fontFamily: token.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              background: token.gold, color: token.bg, padding: '9px 18px', borderRadius: 3, fontWeight: 700,
            }}>
              Open Dashboard
            </a>
          ) : (
            <>
              <a href="/login" style={{
                fontFamily: token.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: token.subtle, padding: '9px 14px',
              }}>
                Sign In
              </a>
              <a href="/signup" style={{
                fontFamily: token.mono, fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
                background: token.gold, color: token.bg, padding: '9px 18px', borderRadius: 3, fontWeight: 700,
              }}>
                Get Started
              </a>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', textAlign: 'center',
        background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200, 146, 60, 0.07) 0%, transparent 70%)`,
      }}>
        <div className="fade-up" style={{ marginBottom: 20 }}>
          <span style={{
            fontFamily: token.mono, fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: token.gold, border: `1px solid rgba(200, 146, 60, 0.3)`,
            padding: '5px 14px', borderRadius: 2,
          }}>
            Ully Business Platform
          </span>
        </div>

        <h1 className="fade-up delay-1" style={{
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1,
          letterSpacing: '-0.02em', maxWidth: 780, marginBottom: 24,
        }}>
          The AI operations platform<br />
          <span style={{ color: token.gold }}>for coffee professionals.</span>
        </h1>

        <p className="fade-up delay-2" style={{
          fontSize: 'clamp(15px, 2vw, 18px)', color: token.subtle, maxWidth: 520,
          lineHeight: 1.7, marginBottom: 44,
        }}>
          Manage your cafe, team, and equipment with an AI assistant that knows your business —
          from espresso machines to shift schedules.
        </p>

        <div className="fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {loggedIn ? (
            <a href="/dashboard" style={{
              background: token.gold, color: token.bg, padding: '14px 32px', borderRadius: 3,
              fontFamily: token.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
            }}>
              Open Dashboard
            </a>
          ) : (
            <>
              <a href="/signup" style={{
                background: token.gold, color: token.bg, padding: '14px 32px', borderRadius: 3,
                fontFamily: token.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
              }}>
                Start Free
              </a>
              <a href="/login" style={{
                border: `1px solid ${token.line}`, color: token.subtle, padding: '14px 28px', borderRadius: 3,
                fontFamily: token.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
              }}>
                Sign In
              </a>
            </>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="fade-up delay-4" style={{ position: 'absolute', bottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: token.mono, fontSize: 8, letterSpacing: '0.2em', color: token.muted, textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${token.muted}, transparent)` }} />
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />

      {/* ── Platform Features ───────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 120px)' }}>
        <div className="fade-up" style={{ marginBottom: 64, maxWidth: 560 }}>
          <p style={{ fontFamily: token.mono, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: token.gold, marginBottom: 16 }}>
            Platform
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            Everything your operation needs in one place.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7.5" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <path d="M5 9h2l2-4 2 8 2-4h2" stroke="#C8923C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              label: 'Ully AI',
              title: 'Context-aware intelligence',
              desc: 'Your AI assistant knows your active equipment, team size, low-stock items, and org type. Every answer is grounded in your actual operation.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="3" width="14" height="10" rx="1.5" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <path d="M6 13v2M12 13v2M4 16h10" stroke="#C8923C" strokeWidth="1.2" strokeLinecap="round" />
                  <path d="M5.5 8.5h7M5.5 6.5h4" stroke="#C8923C" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                </svg>
              ),
              label: 'Equipment',
              title: 'Machine registry & service history',
              desc: 'Track every machine, brand, model, and serial number. Log service records and maintenance events. Know what was done and when.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="7" cy="6" r="2.5" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <path d="M2 15c0-3 2-5 5-5" stroke="#C8923C" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
                  <circle cx="13" cy="10" r="3" stroke="#C8923C" strokeWidth="1" />
                  <path d="M13 8.5v1.5l1 1" stroke="#C8923C" strokeWidth="1" strokeLinecap="round" />
                </svg>
              ),
              label: 'Team',
              title: 'Staff, training & scheduling',
              desc: 'Manage your full team roster, track training sessions with scores, schedule weekly shifts, and onboard new members with invite codes.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 14l3-4 3 2 3-5 3 3" stroke="#C8923C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 4h12" stroke="#C8923C" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                </svg>
              ),
              label: 'Revenue',
              title: 'Revenue & expense tracking',
              desc: 'Log daily revenue by category and track expenses by vendor. Get a clear view of your financial position without a spreadsheet.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2.5" y="2.5" width="6" height="6" rx="1" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <rect x="9.5" y="2.5" width="6" height="6" rx="1" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <rect x="2.5" y="9.5" width="6" height="6" rx="1" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <path d="M12.5 12.5h1.5M12.5 14h1.5M9.5 12.5h1.5" stroke="#C8923C" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                </svg>
              ),
              label: 'Inventory',
              title: 'Stock levels & par alerts',
              desc: 'Track every product, bean, and supply by quantity and unit. Set par levels and get instant alerts when stock falls below threshold.',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="14" height="12" rx="1.5" stroke="#C8923C" strokeWidth="1" opacity="0.4" />
                  <path d="M6 2v4M12 2v4M2 8h14" stroke="#C8923C" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
                  <path d="M5 11h2M8 11h2M11 11h2M5 13.5h2M8 13.5h2" stroke="#C8923C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                </svg>
              ),
              label: 'Schedule',
              title: 'Weekly shift calendar',
              desc: 'Build and view your weekly schedule by team member. Assign positions, set shift times, and keep your floor covered.',
            },
          ].map((f, i) => (
            <div key={f.label} className={`fade-up delay-${(i % 3) + 1}`} style={{
              background: token.card, border: `1px solid ${token.line}`,
              padding: '32px 28px', transition: 'background 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = token.cardHover)}
              onMouseLeave={e => (e.currentTarget.style.background = token.card)}
            >
              <div style={{ marginBottom: 20 }}>{f.icon}</div>
              <p style={{ fontFamily: token.mono, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: token.gold, marginBottom: 10 }}>
                {f.label}
              </p>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: token.subtle, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />

      {/* ── Coming Soon ─────────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 120px)' }}>
        <div className="fade-up" style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: token.mono, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: token.gold, marginBottom: 16 }}>
            Coming Soon
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', maxWidth: 520 }}>
            What&apos;s next for Ully.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {[
            { title: 'Automated Reports', desc: 'Weekly and monthly reports generated automatically — revenue summaries, training completion, service logs.' },
            { title: 'Multi-location Support', desc: 'Manage multiple cafes from a single organization account with per-location dashboards and staff.' },
            { title: 'Supplier Integration', desc: 'Connect directly with your coffee suppliers for automated reorder suggestions based on inventory par levels.' },
            { title: 'Knowledge Base', desc: 'A curated, searchable library of coffee technique, extraction science, and equipment maintenance — offline-ready.' },
          ].map((item, i) => (
            <div key={item.title} className={`fade-up delay-${(i % 4) + 1}`} style={{
              padding: '28px 24px', border: `1px solid ${token.line}`, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(to right, transparent, rgba(200, 146, 60, 0.3), transparent)`,
              }} />
              <p style={{ fontFamily: token.mono, fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: token.muted, marginBottom: 12 }}>
                Planned
              </p>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: token.subtle, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ─────────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />

      {/* ── CTA ─────────────────────────────────────────── */}
      {!loggedIn && (
        <section style={{
          padding: 'clamp(80px, 10vw, 120px) 24px', textAlign: 'center',
          background: `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200, 146, 60, 0.05) 0%, transparent 70%)`,
        }}>
          <h2 className="fade-up" style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, marginBottom: 20, letterSpacing: '-0.01em' }}>
            Ready to run a smarter cafe?
          </h2>
          <p className="fade-up delay-1" style={{ fontSize: 16, color: token.subtle, marginBottom: 40, maxWidth: 420, margin: '0 auto 40px' }}>
            Create your organization, add your team, and let Ully AI do the heavy lifting.
          </p>
          <div className="fade-up delay-2">
            <a href="/signup" style={{
              background: token.gold, color: token.bg, padding: '15px 40px', borderRadius: 3,
              fontFamily: token.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700,
              display: 'inline-block',
            }}>
              Create Free Account
            </a>
          </div>
        </section>
      )}

      {/* ── Mobile App ──────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />

      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 8vw, 120px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40, justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 480 }}>
            <p className="fade-up" style={{ fontFamily: token.mono, fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: token.muted, marginBottom: 16 }}>
              Mobile
            </p>
            <h2 className="fade-up delay-1" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
              Also available as a mobile companion.
            </h2>
            <p className="fade-up delay-2" style={{ fontSize: 14, color: token.subtle, lineHeight: 1.8, marginBottom: 32 }}>
              Ully AI is available as a consumer mobile app for individual baristas and coffee enthusiasts.
              Personal recipe library, AI chat, cafe discovery, and curated barista content — all on your phone.
            </p>
            <div className="fade-up delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#" style={{
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1px solid ${token.line}`, borderRadius: 3, padding: '11px 20px',
                color: token.subtle, fontSize: 13, transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = token.gold; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = token.line; e.currentTarget.style.color = token.subtle }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.182 9.996c-.02 1.81.791 3.176 2.41 4.178-.367 1.005-1.316 3.32-3.077 3.32-.723 0-1.21-.434-2.075-.434-.89 0-1.484.44-2.11.44-1.67 0-3.374-2.2-3.374-4.777 0-2.493 1.554-4.167 3.52-4.167.88 0 1.614.485 2.18.485.533 0 1.37-.52 2.41-.52.394 0 1.55.056 2.116 1.475zm-1.14-5.376C10.533 3.682 9.964 2.5 8.5 2c.013 1.455.757 2.568 1.542 3.62z" />
                </svg>
                <span style={{ fontFamily: token.mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>App Store</span>
                <span style={{ fontFamily: token.mono, fontSize: 8, color: token.muted, letterSpacing: '0.1em' }}>Coming Soon</span>
              </a>
              <a href="#" style={{
                display: 'flex', alignItems: 'center', gap: 10,
                border: `1px solid ${token.line}`, borderRadius: 3, padding: '11px 20px',
                color: token.subtle, fontSize: 13, transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = token.gold; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = token.line; e.currentTarget.style.color = token.subtle }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1.5 1L8.7 8 1.5 15H3l6.4-6.4L15 15h1.5L9 8l7.5-7h-1.5L9.4 7.4 3 1H1.5z" />
                </svg>
                <span style={{ fontFamily: token.mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Google Play</span>
                <span style={{ fontFamily: token.mono, fontSize: 8, color: token.muted, letterSpacing: '0.1em' }}>Coming Soon</span>
              </a>
            </div>
          </div>

          {/* Decorative terminal block */}
          <div className="fade-up delay-2" style={{
            background: token.card, border: `1px solid ${token.line}`, borderRadius: 4,
            padding: '24px 28px', minWidth: 260, maxWidth: 340,
          }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {['#C84040', '#C89040', '#4A8C5C'].map(c => (
                <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{ fontFamily: token.mono, fontSize: 11, lineHeight: 2, color: token.subtle }}>
              <div><span style={{ color: token.gold }}>ully</span> &gt; what&apos;s my espresso extraction?</div>
              <div style={{ color: '#6EAB7E', marginTop: 4 }}>— Your Slayer has 3 active shots.</div>
              <div style={{ color: '#6EAB7E' }}>  Check your last service: 12 days ago.</div>
              <div style={{ color: '#6EAB7E' }}>  Suggested: 9 bars, 28s, 36g out.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />

      <footer style={{ padding: '32px clamp(24px, 8vw, 120px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <span style={{ fontFamily: token.mono, fontSize: 10, fontWeight: 700, color: token.gold, letterSpacing: '0.3em' }}>
          ULLY
        </span>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {[
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms', href: '/terms' },
            { label: 'Support', href: '/support' },
            { label: 'Data', href: '/data' },
            { label: 'Delete Account', href: '/delete-account' },
          ].map(l => (
            <a key={l.href} href={l.href} style={{
              fontFamily: token.mono, fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: token.muted, transition: 'color 0.15s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = token.subtle)}
              onMouseLeave={e => (e.currentTarget.style.color = token.muted)}
            >
              {l.label}
            </a>
          ))}
        </div>

        <span style={{ fontFamily: token.mono, fontSize: 8, color: token.muted, letterSpacing: '0.1em' }}>
          © {new Date().getFullYear()} Ully AI
        </span>
      </footer>

    </div>
  )
}
