'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface SidebarProps {
  orgName: string
  orgId: string
  userName: string
  role: string
  onClose?: () => void
}

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="1" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8.5" y="1" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="1" y="8.5" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.6" />
        <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="0.5" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: '/chat',
    label: 'Ully AI',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1 2.5A1.5 1.5 0 012.5 1h10A1.5 1.5 0 0114 2.5v7A1.5 1.5 0 0112.5 11H9l-3 3v-3H2.5A1.5 1.5 0 011 9.5v-7z" fill="currentColor" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: '/equipment',
    label: 'Equipment',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M7.5 1L9 4h4l-3 2.5 1 4L7.5 8 4 10.5l1-4L2 4h4L7.5 1z" fill="currentColor" opacity="0.6" />
        <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: '/team',
    label: 'Team',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="4.5" r="2.5" fill="currentColor" opacity="0.6" />
        <path d="M2 13c0-3.038 2.462-5.5 5.5-5.5S13 9.962 13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: '/inventory',
    label: 'Inventory',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="5" width="13" height="9" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <path d="M5 5V3.5A2.5 2.5 0 0110 3.5V5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        <line x1="1" y1="8.5" x2="14" y2="8.5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    href: '/schedule',
    label: 'Schedule',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <rect x="1" y="2.5" width="13" height="11" rx="0.5" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="5" y1="1" x2="5" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="10" y1="1" x2="10" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="1" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  },
  {
    href: '/revenue',
    label: 'Revenue',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M1 11.5l4-4 3 2.5 3.5-5L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="7.5" r="2" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <path d="M7.5 1v1.5M7.5 12.5V14M1 7.5h1.5M12.5 7.5H14M2.6 2.6l1.1 1.1M11.3 11.3l1.1 1.1M11.3 3.7l-1.1 1.1M3.8 11.3l-1.1 1.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
]

export default function Sidebar({ orgName, orgId, userName, role, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <aside
      style={{
        width: 220,
        minHeight: '100vh',
        background: '#080604',
        borderRight: '1px solid #1E1A17',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Brand */}
      <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #1E1A17' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 700,
            color: '#C8923C',
            letterSpacing: '0.2em',
            marginBottom: 2,
          }}
        >
          ULLY
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 8,
            color: '#4A4440',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          business platform
        </div>
      </div>

      {/* Org info */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #1E1A17' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: '#4A4440',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          {role}
        </div>
        <div style={{ fontSize: 13, color: '#C4B8AA', fontWeight: 500, marginBottom: 2 }}>
          {orgName}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            color: '#4A4440',
            letterSpacing: '0.1em',
          }}
        >
          {orgId.slice(0, 12).toUpperCase()}
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '8px 0' }}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 24px',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: isActive ? '#C8923C' : '#6B5E52',
                background: isActive ? 'rgba(200,146,60,0.06)' : 'transparent',
                borderLeft: isActive ? '2px solid #C8923C' : '2px solid transparent',
                transition: 'all 0.15s',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: isActive ? '#C8923C' : '#4A4440', flexShrink: 0 }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer: user + logout */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid #1E1A17' }}>
        <div style={{ fontSize: 12, color: '#C4B8AA', marginBottom: 2 }}>{userName}</div>
        <button
          onClick={handleLogout}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#4A4440',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            marginTop: 8,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => ((e.target as HTMLElement).style.color = '#C4B8AA')}
          onMouseLeave={e => ((e.target as HTMLElement).style.color = '#4A4440')}
        >
          Sign out →
        </button>
      </div>
    </aside>
  )
}
