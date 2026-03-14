'use client'

import { useEffect, useState } from 'react'
import FlowerIcon from './FlowerIcon'
import CoffeeFarmScene from './CoffeeFarmScene'
import SocialFooterBar from './SocialFooterBar'
import ContactEmailModal from './ContactEmailModal'

interface Props {
  loggedIn: boolean
}

function useFadeUp() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in, .scale-in')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
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
  muted: '#6B5E52',
  subtle: '#C4B8AA',
  mono: "'Menlo', 'Monaco', 'Courier New', monospace",
  pixel: "var(--font-pixel-family)",
  sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
}

export default function LandingPage({ loggedIn }: Props) {
  useFadeUp()
  const [newsEmail, setNewsEmail] = useState('')
  const [newsSent, setNewsSent] = useState(false)

  function handleNewsSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newsEmail) return
    setNewsSent(true)
    setNewsEmail('')
  }

  return (
    <div style={{ background: token.bg, color: 'white', fontFamily: token.sans, overflowX: 'hidden' }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="lp-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 64,
        background: 'rgba(14, 12, 10, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${token.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <FlowerIcon size={30} glow />
          </a>
          <div className="lp-nav-links" style={{ display: 'flex', gap: 24 }}>
            {[['Products', '/products'], ['Pricing', '/pricing']].map(([label, href]) => (
              <a key={href} href={href} className="t-nav">
                <span className="t-brk" aria-hidden="true">[</span>
                {label}
                <span className="t-brk" aria-hidden="true">]</span>
              </a>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {loggedIn ? (
            <a href="/dashboard" style={{
              fontFamily: token.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
              background: token.gold, color: token.bg, padding: '10px 20px', borderRadius: 3, fontWeight: 700,
            }}>
              Open Dashboard
            </a>
          ) : (
            <a href="/login" className="t-nav lp-signin">
              <span className="t-brk" aria-hidden="true">[</span>
              Sign In
              <span className="t-brk" aria-hidden="true">]</span>
            </a>
          )}
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        padding: '160px 24px 120px', textAlign: 'center',
        background: `radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200, 146, 60, 0.07) 0%, transparent 70%)`,
      }}>
        <div className="fade-up" style={{ marginBottom: 16 }}>
          <span style={{
            fontFamily: token.mono, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: token.gold, border: `1px solid rgba(200, 146, 60, 0.4)`,
            padding: '7px 16px', borderRadius: 2,
          }}>
            Ully AI — Espresso Instructor
          </span>
        </div>

        <h1 className="fade-up delay-1" style={{
          fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 700, lineHeight: 1.1,
          letterSpacing: '-0.02em', maxWidth: 820, marginBottom: 16,
        }}>
          Most baristas operate their machine.<br />
          <span style={{ color: token.gold }}>Certified pilots fly it.</span>
        </h1>

        <p className="fade-up delay-2" style={{
          fontFamily: token.mono, fontSize: 'clamp(12px, 1.4vw, 14px)', color: token.subtle, maxWidth: 560,
          lineHeight: 1.9, marginBottom: 12, letterSpacing: '0.03em',
        }}>
          This curriculum takes you from your first shot to certified Barista Champion. A professional who reads instruments, diagnoses under pressure, and maintains their machine.
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

      </section>

      {/* ── Transition ───────────────────────────────────── */}
      <div style={{
        height: 80,
        background: `linear-gradient(to bottom, transparent, ${token.bg})`,
        marginTop: -80,
        position: 'relative',
        zIndex: 1,
      }} />

      {/* ── Ully AI — Copilot ────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 8vw, 120px)', background: token.bg }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 64, alignItems: 'center', maxWidth: 1100, margin: '0 auto' }}>
          <div>
            <div style={{ fontFamily: token.mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: token.gold, marginBottom: 16 }}>
              01 — Ully AI
            </div>
            <h2 className="fade-left" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'white', marginBottom: 20 }}>
              Your copilot.<br />Every shift.
            </h2>
            <p className="fade-left delay-1" style={{ fontFamily: token.mono, fontSize: 13, color: token.subtle, lineHeight: 1.9, marginBottom: 28, letterSpacing: '0.03em' }}>
              Ully is the espresso instructor in your ear during every service — machine-level vocabulary, specific numbers, direct diagnosis. Pre-shift checks, mid-rush faults, post-shift debriefs. No hedging. Powered by Claude Sonnet.
            </p>
            <div className="fade-left delay-2" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Pre-shift check — what do I inspect before first pull?',
                'Solenoid not releasing pressure between shots',
                'Shot channeling badly — third attempt, same result',
                'Walk me through an OPV calibration procedure',
              ].map(q => (
                <div key={q} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: token.mono, fontSize: 11, color: '#4A9EE0', marginTop: 2, flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: token.mono, fontSize: 12, color: '#4A9EE0', lineHeight: 1.5 }}>{q}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-right delay-1 terminal-deco" style={{
            background: token.card, border: `1px solid ${token.line}`, borderRadius: 6,
            padding: '28px 32px', maxWidth: 440,
          }}>
            <div style={{ display: 'flex', gap: 7, marginBottom: 24 }}>
              {['#C84040', '#C89040', '#4A8C5C'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
              ))}
            </div>
            <div style={{ fontFamily: token.mono, fontSize: 12, lineHeight: 2.1, color: token.subtle }}>
              <div><span style={{ color: token.muted }}>pilot</span> <span style={{ color: token.gold }}>›</span> pre-shift check — boiler ready?</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Boiler at 93°C. Pressure nominal.</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Flush the group. Ready for first pull.</div>
              <div style={{ marginTop: 16 }}><span style={{ color: token.muted }}>pilot</span> <span style={{ color: token.gold }}>›</span> solenoid not releasing between shots</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Classic three-way valve clog.</div>
              <div style={{ color: '#6EAB7E', paddingLeft: 12 }}>Backflush with Cafiza — 5 cycles.</div>
              <div style={{ color: '#C89040', paddingLeft: 12 }}>If persists: disassemble and inspect.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile App ───────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />

      <section style={{ padding: 'clamp(60px, 4vw, 80px) clamp(24px, 8vw, 120px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 40, justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 480 }}>
            <p className="fade-left" style={{ fontFamily: token.mono, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: token.gold, marginBottom: 16 }}>
              Mobile
            </p>
            <h2 className="fade-left delay-1" style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, marginBottom: 16, lineHeight: 1.2 }}>
              Your copilot. In your pocket.
            </h2>
            <p className="fade-left delay-2" style={{ fontSize: 14, color: token.subtle, lineHeight: 1.8, marginBottom: 32 }}>
              The Ully mobile app is coming soon to iOS and Android. Your espresso instructor available for every pre-shift check, mid-rush fault, and post-shift debrief — full curriculum and AI copilot, always on deck.
            </p>
            <div className="fade-left delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                {
                  label: 'App Store',
                  icon: <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.3.05-2.28-1.32-3.11-2.54C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.18 1.27-2.16 3.79.03 3.02 2.65 4.03 2.68 4.04l-.07.29zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />,
                },
                {
                  label: 'Google Play',
                  icon: <path d="M3 20.5v-17c0-.83 1.01-1.27 1.64-.67l13 8.5c.57.37.57 1.17 0 1.54l-13 8.5c-.63.6-1.64.16-1.64-.67z" />,
                },
              ].map(({ label, icon }) => (
                <a key={label} href="#" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  border: `1px solid ${token.line}`, borderRadius: 3, padding: '11px 20px',
                  color: token.subtle, fontSize: 13, transition: 'border-color 0.2s, color 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = token.gold; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = token.line; e.currentTarget.style.color = token.subtle }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">{icon}</svg>
                  <span style={{ fontFamily: token.mono, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
                  <span style={{ fontFamily: token.mono, fontSize: 10, color: token.muted, letterSpacing: '0.1em' }}>Coming Soon</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      {!loggedIn && (
        <>
          <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${token.line}, transparent)`, margin: '0 40px' }} />
          <section style={{
            padding: 'clamp(80px, 10vw, 120px) 24px', textAlign: 'center',
            background: `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(200, 146, 60, 0.05) 0%, transparent 70%)`,
          }}>
            <h2 className="scale-in" style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 700, marginBottom: 20, letterSpacing: '-0.01em' }}>
              Ready to earn your wings?
            </h2>
            <div className="fade-up delay-1" style={{ marginTop: 32 }}>
              <p style={{ fontFamily: token.mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: token.subtle, marginBottom: 18 }}>
                Sign up for updates on our latest innovations
              </p>
              {newsSent ? (
                <p style={{ fontFamily: token.mono, fontSize: 12, color: '#4A8C5C', letterSpacing: '0.08em' }}>
                  ✓ You&apos;re on the list.
                </p>
              ) : (
                <form onSubmit={handleNewsSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={newsEmail}
                    onChange={e => setNewsEmail(e.target.value)}
                    required
                    style={{
                      background: '#1A1614', border: `1px solid #2A2218`, borderRadius: 3,
                      padding: '10px 16px', color: '#FFFFFF', fontSize: 13,
                      fontFamily: token.mono, outline: 'none', minWidth: 240,
                    }}
                  />
                  <button type="submit" style={{
                    background: token.gold, color: token.bg, border: 'none', borderRadius: 3,
                    padding: '10px 24px', fontFamily: token.mono, fontSize: 10,
                    fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </section>
        </>
      )}

      {/* ── Social + Newsletter ─────────────────────────── */}
      <SocialFooterBar />

      {/* ── Farm Scene ───────────────────────────────────── */}
      <CoffeeFarmScene />

      {/* ── Footer ───────────────────────────────────────── */}
      <footer style={{
        padding: '32px 48px', background: token.bg,
        borderTop: `1px solid ${token.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/" style={{ fontFamily: token.pixel, fontSize: 12, color: token.gold, letterSpacing: '0.1em', textDecoration: 'none' }}>ULLY</a>
          <span style={{ fontFamily: token.mono, fontSize: 11, color: token.subtle, letterSpacing: '0.08em' }}>© 2026 Ully App</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <a key={href} href={href} className="t-nav" style={{ fontSize: 11 }}>
              <span className="t-brk" aria-hidden="true">[</span>
              {label}
              <span className="t-brk" aria-hidden="true">]</span>
            </a>
          ))}
          <ContactEmailModal />
        </div>
      </footer>

    </div>
  )
}
