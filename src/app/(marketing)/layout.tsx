'use client'

import Link from 'next/link'
import FlowerIcon from '@/components/FlowerIcon'
import CoffeeFarmScene from '@/components/CoffeeFarmScene'
import SocialFooterBar from '@/components/SocialFooterBar'

const NAV_LINKS = [
  ['Products', '/products'],
  ['Pricing', '/pricing'],
]

const FOOTER_LINKS = [
  ['Products', '/products'],
  ['Pricing', '/pricing'],
  ['Privacy', '/privacy'],
  ['Terms', '/terms'],
]

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0E0C0A' }}>
      <nav className="mkt-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 60,
        borderBottom: '1px solid #1E1A17',
        background: 'rgba(14,12,10,0.96)',
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <FlowerIcon size={30} glow />
          </Link>
          <div className="mkt-nav-links" style={{ display: 'flex', gap: 24 }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={href} href={href} className="t-nav">
                <span className="t-brk" aria-hidden="true">[</span>
                {label}
                <span className="t-brk" aria-hidden="true">]</span>
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <Link href="/login" className="t-nav mkt-signin">
            <span className="t-brk" aria-hidden="true">[</span>
            Sign In
            <span className="t-brk" aria-hidden="true">]</span>
          </Link>
        </div>
      </nav>

      <div style={{ paddingTop: 60 }}>
        {children}
      </div>

      {/* Social + Newsletter */}
      <SocialFooterBar />

      {/* Farm scene */}
      <CoffeeFarmScene />

      {/* Footer */}
      <footer style={{
        padding: '32px 48px', background: '#0E0C0A',
        borderTop: '1px solid #1E1A17',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-pixel-family)', fontSize: 12, color: '#C8923C', letterSpacing: '0.1em', textDecoration: 'none' }}>ULLY</Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.08em' }}>© 2026 Ully</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          {FOOTER_LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="t-nav" style={{ fontSize: 11 }}>
              <span className="t-brk" aria-hidden="true">[</span>
              {label}
              <span className="t-brk" aria-hidden="true">]</span>
            </Link>
          ))}
          <a href="mailto:support@ullyapp.com" style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.08em', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C8923C')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#6B5E52')}
          >support@ullyapp.com</a>
        </div>
      </footer>
    </div>
  )
}
