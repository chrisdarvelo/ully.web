'use client'

import Link from 'next/link'
import FlowerIcon from '@/components/FlowerIcon'
import CoffeeFarmScene from '@/components/CoffeeFarmScene'
import ContactEmailModal from '@/components/ContactEmailModal'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0E0C0A' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 56, borderBottom: '1px solid #1E1A17', background: 'rgba(14,12,10,0.96)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <FlowerIcon size={28} glow />
        </Link>
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Platform', '/login']].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="t-nav">
                <span className="t-brk" aria-hidden="true">[</span>
                {label}
                <span className="t-brk" aria-hidden="true">]</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ paddingTop: 56 }}>
        {children}
      </div>

      <CoffeeFarmScene />

      <footer style={{
        padding: '32px 48px', background: '#0E0C0A',
        borderTop: '1px solid #1E1A17',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link href="/" style={{ fontFamily: 'var(--font-pixel-family)', fontSize: 12, color: '#C8923C', letterSpacing: '0.1em', textDecoration: 'none' }}>ULLY</Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', letterSpacing: '0.08em' }}>© 2026 Ully App</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms']].map(([label, href]) => (
            <Link key={href} href={href} className="t-nav" style={{ fontSize: 11 }}>
              <span className="t-brk" aria-hidden="true">[</span>
              {label}
              <span className="t-brk" aria-hidden="true">]</span>
            </Link>
          ))}
          <ContactEmailModal />
        </div>
      </footer>
    </div>
  )
}
