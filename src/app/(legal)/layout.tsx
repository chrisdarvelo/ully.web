import Link from 'next/link'

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#0E0C0A' }}>
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', height: 56, borderBottom: '1px solid #1E1A17', background: 'rgba(14,12,10,0.96)', backdropFilter: 'blur(20px)' }}>
        <Link href="/login" style={{ fontFamily: 'var(--font-pixel-family)', fontSize: 12, color: '#C8923C', letterSpacing: '0.1em' }}>ULLY</Link>
        <ul style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Support', '/support'], ['Platform', '/login']].map(([label, href]) => (
            <li key={href}>
              <Link href={href} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B8AA', transition: 'color 0.15s' }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ paddingTop: 56 }}>
        {children}
      </div>

      <footer style={{ padding: '32px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, borderTop: '1px solid #1E1A17' }}>
        <span style={{ fontFamily: 'var(--font-pixel-family)', fontSize: 11, color: '#C8923C', letterSpacing: '0.1em' }}>ULLY</span>
        <ul style={{ display: 'flex', gap: 24, listStyle: 'none', flexWrap: 'wrap' }}>
          {[['Privacy', '/privacy'], ['Terms', '/terms'], ['Data Usage', '/data'], ['Delete Account', '/delete-account'], ['Support', '/support']].map(([label, href]) => (
            <li key={href}>
              <Link href={href} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4B8AA' }}>{label}</Link>
            </li>
          ))}
        </ul>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.08em' }}>© 2026 Ully AI</span>
      </footer>
    </div>
  )
}
