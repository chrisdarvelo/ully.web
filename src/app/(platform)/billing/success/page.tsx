'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BillingSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push('/dashboard'), 3000)
    return () => clearTimeout(t)
  }, [router])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, color: '#4A8C5C' }}>✓</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4B8AA' }}>
        Subscription activated
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', letterSpacing: '0.1em' }}>
        Redirecting to dashboard...
      </div>
    </div>
  )
}
