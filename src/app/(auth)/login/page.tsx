'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Login failed')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0E0C0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 32,
              fontWeight: 700,
              color: '#C8923C',
              letterSpacing: '0.16em',
              textShadow: '0 0 8px rgba(200,146,60,0.8), 0 0 24px rgba(200,146,60,0.3)',
              marginBottom: 8,
            }}
          >
            ULLY
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
            business platform
          </div>
        </div>

        {/* Card */}
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 28 }}>
            Sign in to your account
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                style={{
                  width: '100%',
                  background: '#0E0C0A',
                  border: '1px solid #1E1A17',
                  borderRadius: 3,
                  padding: '10px 12px',
                  color: 'white',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#C8923C')}
                onBlur={e => (e.target.style.borderColor = '#1E1A17')}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: '100%',
                  background: '#0E0C0A',
                  border: '1px solid #1E1A17',
                  borderRadius: 3,
                  padding: '10px 12px',
                  color: 'white',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#C8923C')}
                onBlur={e => (e.target.style.borderColor = '#1E1A17')}
              />
            </div>

            {error && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#E07070', letterSpacing: '0.08em' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? '#6B4E1E' : '#C8923C',
                color: '#0E0C0A',
                border: 'none',
                borderRadius: 3,
                padding: '11px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 4,
                transition: 'background 0.15s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.1em' }}>
          No account?{' '}
          <Link href="/signup" style={{ color: '#C8923C' }}>
            Create one →
          </Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 9, color: '#2A2218', letterSpacing: '0.1em' }}>
          Have an invite code?{' '}
          <Link href="/join" style={{ color: '#4A4440' }}>
            Join team →
          </Link>
        </p>
      </div>
    </div>
  )
}
