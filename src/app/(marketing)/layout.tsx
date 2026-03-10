import Link from 'next/link'
import FlowerIcon from '@/components/FlowerIcon'
import CoffeeFarmScene from '@/components/CoffeeFarmScene'

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
      <nav style={{
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
          <div style={{ display: 'flex', gap: 24 }}>
            {NAV_LINKS.map(([label, href]) => (
              <Link key={href} href={href} className="t-nav">
                <span className="t-brk" aria-hidden="true">[</span>
                {label}
                <span className="t-brk" aria-hidden="true">]</span>
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/login" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', padding: '9px 16px', textDecoration: 'none' }}>
            Sign In
          </Link>
          <Link href="/signup" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', background: '#C8923C', color: '#0E0C0A', padding: '9px 20px', borderRadius: 3, fontWeight: 700, textDecoration: 'none' }}>
            Get Started
          </Link>
        </div>
      </nav>

      <div style={{ paddingTop: 60 }}>
        {children}
      </div>

      <CoffeeFarmScene />

      <footer style={{ padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <Link href="/" style={{ fontFamily: 'var(--font-pixel-family)', fontSize: 11, color: '#C8923C', letterSpacing: '0.1em', textDecoration: 'none' }}>ULLY</Link>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {FOOTER_LINKS.map(([label, href]) => (
            <Link key={href} href={href} className="t-nav">
              <span className="t-brk" aria-hidden="true">[</span>
              {label}
              <span className="t-brk" aria-hidden="true">]</span>
            </Link>
          ))}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.08em' }}>© 2026 Ully AI</span>
      </footer>
    </div>
  )
}
