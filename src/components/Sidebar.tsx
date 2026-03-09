'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarProps {
  orgName: string
  userName: string
  role: string
  onClose?: () => void
}

const TEAM_PATHS = ['/team', '/training', '/schedule']

export default function Sidebar({ orgName, userName, role, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href
  const isTeamActive = TEAM_PATHS.includes(pathname)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '10px 24px',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: active ? '#C8923C' : '#8A7A6E',
    background: active ? 'rgba(200,146,60,0.07)' : 'transparent',
    borderLeft: active ? '2px solid #C8923C' : '2px solid transparent',
    transition: 'all 0.15s',
    textDecoration: 'none',
  })

  const subLinkStyle = (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 24px 8px 52px',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: active ? '#C8923C' : '#6B5E52',
    background: active ? 'rgba(200,146,60,0.05)' : 'transparent',
    borderLeft: active ? '2px solid #C8923C' : '2px solid transparent',
    transition: 'all 0.15s',
    textDecoration: 'none',
  })

  const iconColor = (active: boolean) => active ? '#C8923C' : '#6B5E52'

  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      background: '#080604',
      borderRight: '1px solid #1E1A17',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>

      {/* Brand */}
      <div style={{ padding: '22px 24px 18px', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: '#C8923C', letterSpacing: '0.2em', marginBottom: 3 }}>
          ULLY
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          business platform
        </div>
      </div>

      {/* Org info */}
      <div style={{ padding: '14px 24px', borderBottom: '1px solid #1E1A17' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 5 }}>
          {role}
        </div>
        <div style={{ fontSize: 15, color: '#C4B8AA', fontWeight: 600 }}>{orgName}</div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 0' }}>

        {/* Dashboard */}
        <Link href="/dashboard" onClick={onClose} style={linkStyle(isActive('/dashboard'))}>
          <span style={{ color: iconColor(isActive('/dashboard')), flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="1" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.8" />
              <rect x="8.5" y="1" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.8" />
              <rect x="1" y="8.5" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.8" />
              <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.8" />
            </svg>
          </span>
          Dashboard
        </Link>

        {/* Ully AI */}
        <Link href="/chat" onClick={onClose} style={linkStyle(isActive('/chat'))}>
          <span style={{ color: iconColor(isActive('/chat')), flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <path d="M1 2.5A1.5 1.5 0 012.5 1h10A1.5 1.5 0 0114 2.5v7A1.5 1.5 0 0112.5 11H9l-3 3v-3H2.5A1.5 1.5 0 011 9.5v-7z" fill="currentColor" opacity="0.8" />
            </svg>
          </span>
          Ully AI
        </Link>

        {/* Equipment */}
        <Link href="/equipment" onClick={onClose} style={linkStyle(isActive('/equipment'))}>
          <span style={{ color: iconColor(isActive('/equipment')), flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <rect x="2" y="3" width="11" height="8" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.8" />
              <path d="M5 11v2M10 11v2M3 13h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
              <path d="M4.5 7h6M4.5 5.5h3.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            </svg>
          </span>
          Equipment
        </Link>

        {/* Team group */}
        <div>
          <Link href="/team" onClick={onClose} style={{
            ...linkStyle(isActive('/team')),
            color: isTeamActive ? '#C8923C' : '#8A7A6E',
            background: isTeamActive ? 'rgba(200,146,60,0.07)' : 'transparent',
            borderLeft: isActive('/team') ? '2px solid #C8923C' : '2px solid transparent',
          }}>
            <span style={{ color: isTeamActive ? '#C8923C' : '#6B5E52', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="4.5" r="2.5" fill="currentColor" opacity="0.8" />
                <path d="M2 13c0-3.038 2.462-5.5 5.5-5.5S13 9.962 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
              </svg>
            </span>
            Team
          </Link>

          {/* Sub: Schedule */}
          <Link href="/schedule" onClick={onClose} style={subLinkStyle(isActive('/schedule'))}>
            <span style={{ color: isActive('/schedule') ? '#C8923C' : '#4A4440', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <rect x="1" y="2.5" width="13" height="11" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.8" />
                <line x1="5" y1="1" x2="5" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                <line x1="1" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
            </span>
            Schedule
          </Link>

          {/* Sub: Training */}
          <Link href="/training" onClick={onClose} style={subLinkStyle(isActive('/training'))}>
            <span style={{ color: isActive('/training') ? '#C8923C' : '#4A4440', flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                <path d="M1 3h13M1 7.5h9M1 12h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                <circle cx="12.5" cy="10.5" r="2" stroke="currentColor" strokeWidth="1" opacity="0.8" />
              </svg>
            </span>
            Training
          </Link>
        </div>

        {/* Inventory */}
        <Link href="/inventory" onClick={onClose} style={linkStyle(isActive('/inventory'))}>
          <span style={{ color: iconColor(isActive('/inventory')), flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="5" width="13" height="9" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.8" />
              <path d="M5 5V3.5A2.5 2.5 0 0110 3.5V5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
              <line x1="1" y1="8.5" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            </svg>
          </span>
          Inventory
        </Link>

        {/* Revenue */}
        <Link href="/revenue" onClick={onClose} style={linkStyle(isActive('/revenue'))}>
          <span style={{ color: iconColor(isActive('/revenue')), flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <path d="M1 11.5l4-4 3 2.5 3.5-5L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </svg>
          </span>
          Revenue
        </Link>

        {/* Settings */}
        <Link href="/settings" onClick={onClose} style={linkStyle(isActive('/settings'))}>
          <span style={{ color: iconColor(isActive('/settings')), flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1" opacity="0.8" />
              <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.6 2.6l1.1 1.1M11.3 11.3l1.1 1.1M11.3 3.7l-1.1 1.1M3.8 11.3l-1.1 1.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
            </svg>
          </span>
          Settings
        </Link>

      </nav>

      {/* Footer */}
      <div style={{ padding: '18px 24px', borderTop: '1px solid #1E1A17' }}>
        <div style={{ fontSize: 14, color: '#C4B8AA', marginBottom: 4, fontWeight: 500 }}>{userName}</div>
        <button
          onClick={handleLogout}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 8, transition: 'color 0.15s' }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C4B8AA')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = '#4A4440')}
        >
          Sign out →
        </button>
      </div>
    </aside>
  )
}
