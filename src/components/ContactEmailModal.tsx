'use client'

import { useState } from 'react'

const EMAIL = 'support@ullyapp.com'

export default function ContactEmailModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52',
          letterSpacing: '0.08em', transition: 'color 0.15s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C8923C')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#6B5E52')}
      >
        {EMAIL}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#1A1614', border: '1px solid #2A2218', borderRadius: 4,
              padding: '32px 36px', maxWidth: 380, width: '90%', textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
              Contact Us
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: 'white', letterSpacing: '0.06em', marginBottom: 24 }}>
              {EMAIL}
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <a
                href={`mailto:${EMAIL}`}
                style={{
                  background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3,
                  padding: '10px 24px', fontFamily: 'var(--font-mono)', fontSize: 10,
                  fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                  textDecoration: 'none', cursor: 'pointer',
                }}
              >
                Open in Email
              </a>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none', border: '1px solid #2A2218', borderRadius: 3,
                  padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 10,
                  color: '#6B5E52', letterSpacing: '0.16em', textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
