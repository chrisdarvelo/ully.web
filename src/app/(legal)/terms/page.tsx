import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Ully AI — mobile app and business platform.',
}

const SECTIONS = [
  {
    title: 'Acceptance',
    content: [
      'By downloading, installing, or using any Ully product — including the Ully AI mobile app (iOS) or the Ully Business Platform at ullyapp.com — you agree to these Terms. If you do not agree, do not use the service. You must be at least 13 years old to use Ully.',
    ],
  },
  {
    title: 'What Ully Is',
    content: [
      'Ully AI is a mobile app for iOS that provides an AI coffee assistant, espresso dial-in analysis, personal recipe library, cafe bookmarking, barista content, and coffee news.',
      'Ully Business Platform is a web application for cafe owners, roasters, and coffee businesses that provides team management, equipment tracking, inventory, scheduling, revenue reporting, and an AI assistant with full business context.',
      'Both products are powered by Claude, an AI model developed by Anthropic. The AI assistant is designed for coffee-related topics and business operations. It will not respond to requests outside that scope.',
    ],
  },
  {
    title: 'Your Account',
    content: [
      'You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately at support@ullyapp.com if you suspect unauthorized access.',
      'One account per person or organization — automated account creation is prohibited. Business Platform accounts are scoped to a single organization; all data is isolated per organization.',
    ],
  },
  {
    title: 'Mobile App — Additional Terms',
    content: [
      'The Ully AI mobile app is distributed through the Apple App Store. Your use is also subject to Apple\'s Media Services Terms and Conditions.',
      'In-app purchases and subscriptions on iOS are processed through Apple and are subject to Apple\'s payment terms.',
      'The mobile app stores your personal data (recipes, chat history, cafes, profile) on your device only. Uninstalling the app or resetting your device will permanently delete this data — it cannot be recovered.',
    ],
  },
  {
    title: 'Business Platform — Additional Terms',
    content: [
      'Business Platform subscriptions are processed through Stripe. Your subscription plan (Business or Business Pro) determines your access level. Billing terms and cancellation are managed through the Stripe Customer Portal accessible from your Billing page.',
      'A 14-day free trial is included with every new Business Platform account. After the trial, continued access requires an active subscription.',
      'Organization owners are responsible for all activity by team members they invite to the platform.',
    ],
  },
  {
    title: 'Acceptable Use',
    list: [
      'Do not use Ully for any unlawful purpose',
      'Do not attempt to reverse engineer, decompile, or extract source code from the app or platform',
      'Do not use bots or automated systems to interact with either product',
      'Do not attempt to circumvent rate limits, security features, or access controls',
      'Do not submit false, misleading, or harmful content to the AI',
      'Do not upload malicious content or attempt to compromise platform security',
      'Do not misrepresent your organization or impersonate others',
    ],
  },
  {
    title: 'AI Limitations',
    callout: 'AI responses are generated in real-time and provided for informational purposes only. They may not be accurate, complete, or current. You are responsible for any decisions made based on AI-generated content.',
    content: [
      'Ully AI is not a substitute for professional advice from qualified technicians, medical professionals, legal counsel, or financial advisors.',
      'AI responses are proxied through a secure server — your messages are forwarded to Anthropic\'s Claude API and are subject to Anthropic\'s Usage Policy at anthropic.com/legal/aup.',
    ],
  },
  {
    title: 'Your Content',
    content: [
      'Recipes, profiles, and data you create in Ully belong to you. Mobile app data is stored locally on your device and we have no access to it. Business Platform data is stored on our servers and is private to your organization.',
      'We do not claim ownership of any content you create.',
    ],
  },
  {
    title: 'Intellectual Property',
    content: [
      'The Ully app and platform — including their design, code, branding, and all content we create — are owned by Ully AI and protected by applicable intellectual property law. You may not copy, reproduce, or create derivative works without our written permission.',
    ],
  },
  {
    title: 'Privacy',
    content: [
      'Your use of Ully is governed by our Privacy Policy at ullyapp.com/privacy, incorporated here by reference. It covers both the mobile app and the Business Platform.',
    ],
  },
  {
    title: 'Disclaimers',
    content: [
      'Ully is provided "as is" without warranties of any kind, express or implied. We do not warrant that the app or platform will be available, error-free, or accurate at all times.',
    ],
  },
  {
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by law, Ully AI shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from your use of either product. Our total liability for any claim shall not exceed the amount you paid to use the service in the twelve months preceding the claim.',
    ],
  },
  {
    title: 'Termination',
    content: [
      'We may suspend or terminate your account if you violate these Terms. You may delete your account at any time — see ullyapp.com/delete-account for instructions for both the mobile app and the Business Platform.',
    ],
  },
  {
    title: 'Governing Law',
    content: [
      'These Terms are governed by the laws of the United States. Disputes will be resolved in courts of competent jurisdiction.',
    ],
  },
  {
    title: 'Changes',
    content: [
      'We may update these Terms from time to time. Material changes will be communicated within the app and on this page. Continued use after changes constitutes acceptance.',
    ],
  },
  {
    title: 'Contact',
    content: ['Questions: support@ullyapp.com'],
  },
]

export default function TermsPage() {
  return (
    <>
      <div style={{ padding: '80px 48px 56px', borderBottom: '1px solid #1E1A17', maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.01em', marginBottom: 20 }}>Terms of Use</h1>
        <p style={{ fontSize: 17, color: '#C4B8AA', lineHeight: 1.6, maxWidth: 560, marginBottom: 24 }}>
          Plain language. Clear rules. Covers both the Ully AI mobile app and the Ully Business Platform.
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

        {/* Related links */}
        <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid #1E1A17' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 20 }}>Related</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[['Privacy Policy', '/privacy'], ['Full Data Usage Breakdown', '/data'], ['Delete Account', '/delete-account']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 14, color: '#C4B8AA', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #1E1A17' }}>
                <span>{label}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440' }}>→</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
