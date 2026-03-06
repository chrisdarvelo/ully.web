'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

interface PlatformShellProps {
  children: React.ReactNode
  orgName: string
  orgId: string
  userName: string
  role: string
}

export default function PlatformShell({
  children,
  orgName,
  orgId,
  userName,
  role,
}: PlatformShellProps) {
  const [mobile, setMobile] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function check() {
      const isMobile = window.innerWidth < 860
      setMobile(isMobile)
      if (!isMobile) setOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0E0C0A' }}>
      {/* Mobile overlay */}
      {mobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(14, 12, 10, 0.82)',
            zIndex: 150,
            backdropFilter: 'blur(4px)',
          }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: mobile ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: mobile ? 200 : 'auto',
          transform: mobile && !open ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          flexShrink: 0,
        }}
      >
        <Sidebar
          orgName={orgName}
          orgId={orgId}
          userName={userName}
          role={role}
          onClose={() => setOpen(false)}
        />
      </div>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Mobile top bar */}
        {mobile && (
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '0 20px',
              height: 52,
              background: 'rgba(8,6,4,0.96)',
              borderBottom: '1px solid #1E1A17',
              backdropFilter: 'blur(12px)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <span style={{ display: 'block', width: 18, height: 1, background: '#6B5E52' }} />
              <span style={{ display: 'block', width: 18, height: 1, background: '#6B5E52' }} />
              <span style={{ display: 'block', width: 18, height: 1, background: '#6B5E52' }} />
            </button>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                fontWeight: 700,
                color: '#C8923C',
                letterSpacing: '0.2em',
              }}
            >
              ULLY
            </span>
          </div>
        )}

        {children}
      </main>
    </div>
  )
}
