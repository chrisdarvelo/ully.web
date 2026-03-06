import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Ully — Coffee Business Platform', template: '%s — Ully' },
  description: 'The AI-powered operations platform for coffee professionals.',
  icons: { icon: '/images/favicon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
