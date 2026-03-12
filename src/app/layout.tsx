import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import './globals.css'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Ully AI — your coffee companion', template: '%s — Ully' },
  description: 'AI-powered coffee companion for baristas, enthusiasts, and coffee businesses.',
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={pressStart2P.variable}>
      <body>{children}</body>
    </html>
  )
}
