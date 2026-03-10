import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Support' }

const FAQ = [
  { q: 'How do I add my team members?', a: 'Go to Team in the left sidebar. Click "+ Add Member" and fill in their name, role, and contact details.' },
  { q: 'How does Ully AI use my business data?', a: 'Ully AI reads your equipment list, team count, and inventory alerts to give context-aware responses. Your data is never sent to third parties or used to train AI models without your explicit consent.' },
  { q: 'Can I invite other team members to my organization?', a: 'Currently one account per organization owner. Team members are managed inside the platform. Contact support@ullycoffee.com if you need expanded access.' },
  { q: 'How do I track equipment service history?', a: 'Navigate to Equipment, click on any piece of equipment, and you can log service records including date, type, technician, and cost.' },
  { q: 'Is my financial data secure?', a: 'All data is stored in your private organization account. We do not sell, share, or access your financial data. See our Privacy Policy for details.' },
  { q: 'How do I delete my account?', a: 'Go to Settings in the sidebar. Scroll to the bottom and click "Delete Account". This permanently removes all your organization\'s data.' },
]

export default function SupportPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 48px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Help</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em' }}>Support</h1>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>
        {/* Contact */}
        <div style={{ padding: '48px 0', borderTop: '1px solid #1E1A17', borderBottom: '1px solid #1E1A17', marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 14 }}>Contact</div>
          <a href="mailto:support@ullycoffee.com" style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(18px, 3vw, 32px)', fontWeight: 700, color: 'white', letterSpacing: '0.02em', display: 'block', marginBottom: 10, transition: 'color 0.15s' }}>
            support@ullycoffee.com
          </a>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#6B5E52', letterSpacing: '0.08em' }}>We respond within 24 hours.</div>
        </div>

        {/* FAQ */}
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 24 }}>
          Frequently Asked Questions
        </h2>

        {FAQ.map(({ q, a }) => (
          <div key={q} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, padding: '24px 0', borderTop: '1px solid #1E1A17' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.02em', lineHeight: 1.5 }}>{q}</div>
            <div style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.75 }}>{a}</div>
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, padding: '24px 0', borderTop: '1px solid #1E1A17' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'white', letterSpacing: '0.02em', lineHeight: 1.5 }}>Where can I find the mobile app?</div>
          <div style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.75 }}>
            The Ully AI mobile app for iOS and Android is coming soon.{' '}
            <Link href="/login" style={{ color: '#C4B8AA', borderBottom: '1px solid #4A4440' }}>Use the platform →</Link>
          </div>
        </div>
      </div>
    </>
  )
}
