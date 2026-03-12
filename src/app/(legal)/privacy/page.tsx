import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Ully AI — mobile app and business platform.',
}

const SECTIONS = [
  {
    title: 'Introduction',
    content: [
      'Ully AI is available as a mobile app (iOS) and as a web-based business platform at ullyapp.com. This Privacy Policy covers both products. When we say "Ully," "we," or "our," we mean both.',
      'We collect the absolute minimum data necessary to operate the service. Your data is never sold, rented, or shared for advertising purposes.',
    ],
  },
  {
    title: 'Age Requirement',
    content: [
      'Ully is intended for users aged 13 and older. We do not knowingly collect personal information from children under 13. If you believe your child has provided us with personal information, contact support@ullyapp.com and we will delete it promptly.',
    ],
  },
  {
    title: 'What We Collect',
    callout: 'The only personal information we collect and store on our servers is your email address — used solely to create and authenticate your account. We do not use it for marketing.',
    content: [
      'Business Platform: Organization data you enter (equipment, team members, inventory, schedules, revenue) is stored on our servers and is private to your organization.',
      'Mobile App: Your profile, recipes, saved cafes, barista follows, and chat history are stored on your device only using local storage. None of this reaches our servers.',
    ],
  },
  {
    title: 'What We Do Not Collect',
    list: [
      'Chat messages — processed in real-time via Anthropic\'s API, never stored on our servers',
      'Photos and images — sent directly to Anthropic\'s API for real-time analysis, never stored anywhere',
      'Location — used once per request for weather context only, never stored or logged',
      'Date of birth — used client-side for age verification at signup only, never stored',
      'Analytics, advertising identifiers, or behavioral tracking data',
      'Contacts, call logs, browsing history, or any other device data',
    ],
  },
  {
    title: 'Mobile App — On-Device Storage',
    content: [
      'The Ully AI mobile app stores the following data locally on your device using AsyncStorage. We have no access to this data:',
    ],
    list: [
      'Chat history with Ully AI',
      'Personal recipe library',
      'Saved cafes and notes',
      'Barista follows',
      'Profile and onboarding preferences',
    ],
  },
  {
    title: 'Camera and Photos',
    content: [
      'The mobile app requests camera and photo library access only for the Dial-in (espresso extraction analysis) and Scan (equipment part identification) AI features. You may deny these permissions — all other app features continue to work normally.',
      'Photos are sent directly to Anthropic\'s API for real-time analysis. They are never uploaded to our servers, never stored in your account, and never retained after the AI response is returned.',
    ],
  },
  {
    title: 'AI and Generated Content',
    content: [
      'Both products use Claude by Anthropic to generate AI responses. When you send a message or photo, it is transmitted to Anthropic\'s API via a secure server-side proxy — your email or account ID is never included in the request.',
      'Per Anthropic\'s API terms, your inputs are not used to train their models and are retained only briefly for trust and safety monitoring. See Anthropic\'s Privacy Policy at anthropic.com/legal/privacy.',
      'AI responses are informational only and may not always be accurate. Ully is not a substitute for professional advice.',
    ],
  },
  {
    title: 'Business Data',
    content: [
      'Equipment, team, inventory, schedule, and financial data entered into the Business Platform is stored securely and is private to your organization. It is never shared with third parties or other organizations.',
      'Ully may use aggregated, anonymized business data to improve its AI responses only if you explicitly opt in. Opting in is not required to use the platform.',
    ],
  },
  {
    title: 'Third-Party Services',
    list: [
      'Google Firebase — Authentication only. Stores your email address. Subject to Google\'s Privacy Policy.',
      'Anthropic Claude API — Processes AI messages and photos in real-time. Inputs not used for training. Subject to Anthropic\'s Privacy Policy.',
      'wttr.in — Weather data via approximate location (mobile app only). No account or identifier transmitted.',
      'Stripe — Payment processing for Business Platform subscriptions. Subject to Stripe\'s Privacy Policy.',
      'Resend — Transactional email delivery (password resets, team invites). Subject to Resend\'s Privacy Policy.',
    ],
  },
  {
    title: 'We Do Not Sell Your Data',
    content: [
      'We do not sell, rent, trade, or share your personal information with any third party for commercial or marketing purposes. This applies to all users, including California residents under CCPA and EEA/UK residents under GDPR.',
    ],
  },
  {
    title: 'Your Rights',
    list: [
      'Access the email address linked to your account',
      'Edit or update your profile at any time',
      'Delete your account and all associated data — see our Delete Account page',
      'Clear your local chat history at any time from within the mobile app',
      'Deny camera or location permissions on the mobile app without losing core functionality',
      'Request data deletion by emailing support@ullyapp.com if you cannot access the app',
    ],
  },
  {
    title: 'Account Deletion',
    content: [
      'Mobile App: Go to the Profile tab, scroll to the bottom, and tap Delete Account. This removes your Firebase account and clears all local device data.',
      'Business Platform: Go to Settings in the sidebar and use the Delete Account option. This permanently removes your organization, all users, and all associated business data.',
      'Email requests are processed within 30 days. See our full Delete Account guide at ullyapp.com/delete-account.',
    ],
  },
  {
    title: 'Changes to This Policy',
    content: [
      'We may update this policy from time to time. Material changes will be communicated within the app and on this page. Continued use after changes constitutes acceptance.',
    ],
  },
  {
    title: 'Contact',
    content: ['Privacy questions or data requests: support@ullyapp.com'],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 56px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 20 }}>Privacy Policy</h1>
        <p style={{ fontSize: 17, color: '#C4B8AA', lineHeight: 1.6, maxWidth: 560, marginBottom: 24 }}>
          Covers both the Ully AI mobile app and the Ully Business Platform. We collect the minimum necessary — your data is private by default and always will be.
        </p>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', letterSpacing: '0.1em' }}>
            Effective March 12, 2026 &nbsp;·&nbsp; Last updated March 12, 2026
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', letterSpacing: '0.1em' }}>
            Applies to: Ully AI (iOS) &nbsp;·&nbsp; Ully Business Platform (web)
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '64px 48px 120px' }}>
        {SECTIONS.map((section, idx) => (
          <div key={section.title}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', margin: idx === 0 ? '0 0 18px' : '48px 0 18px', paddingTop: idx === 0 ? 0 : 48, borderTop: idx === 0 ? 'none' : '1px solid #1E1A17' }}>
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
                  <li key={i} style={{ fontSize: 15, color: '#C4B8AA', lineHeight: 1.85, padding: '10px 0 10px 20px', position: 'relative', borderBottom: '1px solid #1E1A17' }}>
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
