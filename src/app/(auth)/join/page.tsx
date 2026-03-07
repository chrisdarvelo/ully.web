'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function JoinForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [code, setCode] = useState(searchParams.get('code') ?? '')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const inp: React.CSSProperties = {
    width: '100%',
    background: '#0E0C0A',
    border: '1px solid #1E1A17',
    borderRadius: 3,
    padding: '12px 14px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
  }
  const lbl: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: '#C4B8AA',
    marginBottom: 6,
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim() || !name.trim() || !email.trim() || !password) {
      setError('All fields are required.')
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.trim(), userName: name.trim(), email: email.trim(), password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0E0C0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link href="/" style={{ display: 'block', fontFamily: 'var(--font-pixel-family)', fontSize: 22, fontWeight: 400, color: '#C8923C', letterSpacing: '0.1em', textShadow: '0 0 8px rgba(200,146,60,0.9), 0 0 24px rgba(200,146,60,0.4)', marginBottom: 10, textDecoration: 'none' }}>ULLY</Link>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Join your team</div>
        </div>

        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: 32 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 24 }}>
            Enter invite code
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Invite Code</label>
              <input
                style={{ ...inp, fontFamily: 'var(--font-mono)', letterSpacing: '0.2em', fontSize: 16, textAlign: 'center', textTransform: 'uppercase' }}
                value={code}
                onChange={e => setCode(e.target.value.toUpperCase())}
                placeholder="XXXX-XXXX"
                maxLength={9}
                onFocus={e => (e.target.style.borderColor = '#C8923C')}
                onBlur={e => (e.target.style.borderColor = '#1E1A17')}
              />
            </div>

            <div style={{ height: 1, background: '#1E1A17', margin: '20px 0' }} />

            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Full Name</label>
              <input
                style={inp}
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                onFocus={e => (e.target.style.borderColor = '#C8923C')}
                onBlur={e => (e.target.style.borderColor = '#1E1A17')}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Email</label>
              <input
                type="email"
                style={inp}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                onFocus={e => (e.target.style.borderColor = '#C8923C')}
                onBlur={e => (e.target.style.borderColor = '#1E1A17')}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={lbl}>Password</label>
              <input
                type="password"
                style={inp}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                onFocus={e => (e.target.style.borderColor = '#C8923C')}
                onBlur={e => (e.target.style.borderColor = '#1E1A17')}
              />
            </div>

            {error && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 14, letterSpacing: '0.06em' }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '13px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Joining...' : 'Join Team'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/login" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA', letterSpacing: '0.12em', textDecoration: 'none' }}>
            Already have an account? Sign in →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0E0C0A' }} />}>
      <JoinForm />
    </Suspense>
  )
}
