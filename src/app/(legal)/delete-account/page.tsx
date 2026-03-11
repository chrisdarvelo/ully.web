import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Delete Account' }

export default function DeleteAccountPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 48px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Account</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em' }}>Delete Account</h1>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>
        <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 32 }}>
          Deleting your account permanently removes your organization profile and all associated data — equipment, team, inventory, schedules, and financial records. This cannot be undone.
        </p>

        <div>
          {[
            { num: '01', text: <span>Sign in to your account at <Link href="/login" style={{ color: '#C4B8AA', borderBottom: '1px solid #4A4440' }}>ullyapp.com</Link>.</span> },
            { num: '02', text: 'Navigate to Settings in the left sidebar.' },
            { num: '03', text: 'Scroll to the bottom of the page and click "Delete Account".' },
            { num: '04', text: 'Confirm deletion when prompted. Your data will be permanently removed within 30 days.' },
          ].map(step => (
            <div key={step.num} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, alignItems: 'baseline', padding: '20px 0', borderTop: '1px solid #1E1A17' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.12em' }}>{step.num}</div>
              <div style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.7 }}>{step.text}</div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #1E1A17' }} />
        </div>

        <div style={{ marginTop: 48, padding: '24px', background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 12 }}>Need help?</div>
          <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.75, margin: 0 }}>
            If you can&apos;t access your account or need assistance, email us at{' '}
            <a href="mailto:support@ullyapp.com" style={{ color: '#C8923C' }}>support@ullyapp.com</a>
            {' '}and we&apos;ll delete your data manually.
          </p>
        </div>
      </div>
    </>
  )
}
