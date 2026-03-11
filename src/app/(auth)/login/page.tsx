'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

const GOOGLE_ERRORS: Record<string, string> = {
  google_failed: 'Google sign-in failed. Try again.',
  google_cancelled: 'Google sign-in was cancelled.',
  google_not_configured: 'Google sign-in is not available.',
  google_no_email: 'Could not get email from Google.',
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const e = searchParams.get('error')
    if (e && GOOGLE_ERRORS[e]) setError(GOOGLE_ERRORS[e])
  }, [searchParams])

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
          <Link href="/" style={{
            display: 'block',
            fontFamily: 'var(--font-pixel-family)',
            fontSize: 22,
            fontWeight: 400,
            color: '#C8923C',
            letterSpacing: '0.1em',
            textShadow: '0 0 8px rgba(200,146,60,0.9), 0 0 24px rgba(200,146,60,0.4)',
            marginBottom: 10,
            textDecoration: 'none',
          }}>
            ULLY
          </Link>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
            business platform
          </div>
        </div>

        {/* Card */}
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 28 }}>
            Sign in to your account
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 6 }}>
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
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 6 }}>
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
                fontSize: 12,
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

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 0' }}>
            <div style={{ flex: 1, height: 1, background: '#1E1A17' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.14em' }}>or</span>
            <div style={{ flex: 1, height: 1, background: '#1E1A17' }} />
          </div>

          {/* Google */}
          <a
            href="/api/auth/google"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              marginTop: 16,
              border: '1px solid #2A2218', borderRadius: 3, padding: '11px 0',
              fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: '#C4B8AA', textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C8923C'; (e.currentTarget as HTMLElement).style.color = 'white' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#2A2218'; (e.currentTarget as HTMLElement).style.color = '#C4B8AA' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </a>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', letterSpacing: '0.1em' }}>
          No account?{' '}
          <Link href="/signup" style={{ color: '#C8923C' }}>
            Create one →
          </Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6B5E52', letterSpacing: '0.1em' }}>
          Have an invite code?{' '}
          <Link href="/join" style={{ color: '#C4B8AA' }}>
            Join team →
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
