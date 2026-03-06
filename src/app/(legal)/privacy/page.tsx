import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 48px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 16 }}>Privacy Policy</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.12em' }}>
          Last updated February 21, 2026 · Effective February 21, 2026
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>
        {[
          {
            title: 'Introduction',
            content: [
              'Ully is an AI-powered coffee platform for baristas, coffee enthusiasts, and coffee businesses. Responses are generated in real-time by Claude, an AI model by Anthropic.',
              'This policy explains what data we collect, what we don\'t, and how we handle your information. We collect the absolute minimum necessary to operate the service.',
            ]
          },
          {
            title: 'Age Requirement',
            content: ['Ully is intended for users 13 and older. We do not knowingly collect personal information from children under 13. If you believe your child has provided information to us, contact support@ullycoffee.com and we will delete it promptly.']
          },
          {
            title: 'What We Collect',
            callout: 'The only information we collect and store on our servers is your email address and organization name — used solely to create and authenticate your account.',
            content: ['Business data you enter into the platform (equipment, team, inventory, revenue, schedules) is stored in your account and is private to your organization by default.']
          },
          {
            title: 'What We Do Not Collect',
            list: [
              'Chat messages — processed in real-time, not stored on our servers',
              'Photos — sent to Anthropic\'s API for real-time analysis, never stored',
              'Location — used only for weather context when relevant, never logged',
              'Analytics, advertising IDs, or behavioral data',
              'Contacts, call logs, or browsing history',
            ]
          },
          {
            title: 'AI and Generated Content',
            content: [
              'Ully uses Claude by Anthropic to generate responses. When you send a message, it is transmitted to Anthropic\'s API. Your email or account ID is never included. Per Anthropic\'s API terms, your inputs are not used to train their models.',
              'AI responses are informational only and may not always be accurate. Ully is not a substitute for professional advice.',
            ]
          },
          {
            title: 'Business Data',
            content: [
              'Equipment, team, inventory, and financial data you enter is stored securely and is private to your organization. It is never shared with third parties or other organizations.',
              'Ully may use aggregated, anonymized business data to improve its AI responses only if you explicitly opt in during onboarding.',
            ]
          },
          {
            title: 'Data Retention',
            content: ['Your account data is retained as long as your account is active. You can delete your account at any time, which permanently removes all your data from our servers within 30 days.']
          },
          {
            title: 'Contact',
            content: ['For privacy questions: support@ullycoffee.com']
          }
        ].map(section => (
          <div key={section.title}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', margin: '48px 0 18px', paddingTop: 48, borderTop: '1px solid #1E1A17' }}>
              {section.title}
            </h2>
            {section.callout && (
              <div style={{ borderLeft: '1px solid #6B4E1E', padding: '16px 20px', margin: '0 0 16px' }}>
                <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.85, margin: 0 }}>{section.callout}</p>
              </div>
            )}
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
