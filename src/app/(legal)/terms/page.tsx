import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of Use' }

export default function TermsPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 48px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 16 }}>Terms of Use</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.12em' }}>
          Last updated February 21, 2026 · Effective February 21, 2026
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>
        {[
          {
            title: 'Acceptance',
            content: ['By creating an account or using Ully, you agree to these Terms. If you do not agree, do not use the platform. You must be at least 13 years old to use Ully.']
          },
          {
            title: 'What Ully Is',
            content: [
              'Ully is an AI-powered coffee operations platform for baristas, coffee businesses, and professionals in the coffee supply chain.',
              'The platform provides AI chat assistance, equipment management, team scheduling, inventory tracking, revenue reporting, and related business tools.',
            ]
          },
          {
            title: 'Your Account',
            content: [
              'You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. Notify us at support@ullycoffee.com of any unauthorized access.',
              'One account per organization owner — automated account creation is prohibited.',
            ]
          },
          {
            title: 'Acceptable Use',
            list: [
              'Do not use Ully for any unlawful purpose',
              'Do not attempt to reverse engineer, decompile, or extract source code',
              'Do not use bots or automated systems to interact with the platform',
              'Do not upload malicious content or attempt to compromise the platform\'s security',
              'Do not misrepresent your organization or impersonate others',
            ]
          },
          {
            title: 'AI Limitations',
            content: [
              'Ully\'s AI assistant provides informational responses about coffee, equipment, and business operations. It may not always be accurate. Always verify critical decisions with qualified professionals.',
              'We are not liable for actions taken based on AI-generated content.',
            ]
          },
          {
            title: 'Data and Privacy',
            content: ['Your business data is private to your organization. See our Privacy Policy for full details on how we handle your data.']
          },
          {
            title: 'Termination',
            content: ['We reserve the right to suspend or terminate accounts that violate these Terms. You may delete your account at any time from the platform settings.']
          },
          {
            title: 'Changes',
            content: ['We may update these Terms from time to time. Continued use after changes constitutes acceptance of the new Terms.']
          },
          {
            title: 'Contact',
            content: ['Questions: support@ullycoffee.com']
          }
        ].map((section, idx) => (
          <div key={section.title}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', margin: idx === 0 ? '0 0 18px' : '48px 0 18px', paddingTop: idx === 0 ? 0 : 48, borderTop: idx === 0 ? 'none' : '1px solid #1E1A17' }}>
              {section.title}
            </h2>
            {section.content?.map((p, i) => (
              <p key={i} style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, marginBottom: 16 }}>{p}</p>
            ))}
            {section.list && (
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {section.list.map((item, i) => (
                  <li key={i} style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, padding: '8px 0 8px 20px', position: 'relative', borderBottom: '1px solid #1E1A17' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#6B4E1E', fontFamily: 'var(--font-mono)' }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </>
  )
}
