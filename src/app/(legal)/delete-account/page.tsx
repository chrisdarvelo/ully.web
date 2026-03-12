import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Delete Account',
  description: 'How to delete your Ully AI account — mobile app and Business Platform.',
}

export default function DeleteAccountPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 48px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Account</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 20 }}>Delete Account</h1>
        <p style={{ fontSize: 17, color: '#C4B8AA', lineHeight: 1.6, maxWidth: 560, marginBottom: 24 }}>
          Permanent and cannot be undone. Instructions for both the mobile app and the Business Platform.
        </p>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', letterSpacing: '0.1em' }}>
          Applies to: Ully AI (iOS) &nbsp;·&nbsp; Ully Business Platform (web)
        </span>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>

        {/* Mobile App */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 24 }}>
          Ully AI — Mobile App (iOS)
        </div>
        <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 28 }}>
          Takes less than a minute from within the app.
        </p>
        {[
          'Open the Ully app and sign in.',
          'Tap the Profile tab in the bottom navigation bar.',
          'Scroll to the bottom and tap Delete Account.',
          'Enter your password to confirm.',
          'Tap Delete. Your account and all local data are permanently removed.',
        ].map((text, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, alignItems: 'baseline', padding: '20px 0', borderTop: '1px solid #1E1A17' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.12em' }}>0{i + 1}</div>
            <div style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.7 }}>{text}</div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #1E1A17' }} />

        <div style={{ margin: '24px 0', padding: '16px 20px', borderLeft: '1px solid #6B4E1E' }}>
          <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
            The mobile app stores your recipes, cafes, chat history, and profile on your device only. Deleting your account clears all of it immediately — there is no server-side database to purge separately.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #1E1A17, transparent)', margin: '56px 0' }} />

        {/* Business Platform */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 24 }}>
          Ully Business Platform (web)
        </div>
        <p style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 28 }}>
          Deletes your organization, all team members, and all associated business data.
        </p>
        {[
          <span key="1">Sign in to your account at <Link href="/login" style={{ color: '#C4B8AA', borderBottom: '1px solid #4A4440' }}>ullyapp.com</Link>.</span>,
          'Navigate to Settings in the left sidebar.',
          'Scroll to the bottom and click Delete Account.',
          'Confirm deletion when prompted.',
          'Your organization and all data will be permanently removed within 30 days.',
        ].map((text, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 16, alignItems: 'baseline', padding: '20px 0', borderTop: '1px solid #1E1A17' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.12em' }}>0{i + 1}</div>
            <div style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.7 }}>{text}</div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid #1E1A17' }} />

        <div style={{ margin: '24px 0', padding: '16px 20px', borderLeft: '1px solid #6B4E1E' }}>
          <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>
            Deleting a Business Platform account removes all organization data — equipment, team, inventory, schedules, and financial records. Active subscriptions are cancelled automatically. This cannot be undone.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, transparent, #1E1A17, transparent)', margin: '56px 0' }} />

        {/* Can't access */}
        <div style={{ padding: '24px', background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 12 }}>
            Can&apos;t access the app or platform?
          </div>
          <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.75, margin: 0 }}>
            Email us at{' '}
            <a href="mailto:support@ullyapp.com" style={{ color: '#C8923C' }}>support@ullyapp.com</a>
            {' '}with your account email address. We will process your deletion request within 30 days.
          </p>
        </div>

      </div>
    </>
  )
}
