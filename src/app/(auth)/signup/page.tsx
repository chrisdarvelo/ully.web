'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ORG_TYPES = [
  { value: 'cafe', label: 'Cafe / Coffee Shop' },
  { value: 'roaster', label: 'Roastery' },
  { value: 'distributor', label: 'Distributor / Importer' },
  { value: 'farm', label: 'Farm / Producer' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    orgName: '',
    orgType: 'cafe',
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Signup failed')
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#0E0C0A',
    border: '1px solid #1E1A17',
    borderRadius: 3,
    padding: '10px 12px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#4A4440',
    marginBottom: 6,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0E0C0A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: '#C8923C', letterSpacing: '0.16em', textShadow: '0 0 8px rgba(200,146,60,0.8)', marginBottom: 8 }}>
            ULLY
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.24em', textTransform: 'uppercase' }}>
            business platform
          </div>
        </div>

        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: 32 }}>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 28 }}>
            Create your organization
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Organization section */}
            <div style={{ paddingBottom: 16, borderBottom: '1px solid #1E1A17' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 12 }}>
                Organization
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Business Name</label>
                  <input
                    type="text"
                    required
                    value={form.orgName}
                    onChange={e => update('orgName', e.target.value)}
                    placeholder="Blue Bottle Coffee"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C8923C')}
                    onBlur={e => (e.target.style.borderColor = '#1E1A17')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Type</label>
                  <select
                    value={form.orgType}
                    onChange={e => update('orgType', e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => (e.target.style.borderColor = '#C8923C')}
                    onBlur={e => (e.target.style.borderColor = '#1E1A17')}
                  >
                    {ORG_TYPES.map(t => (
                      <option key={t.value} value={t.value} style={{ background: '#1A1614' }}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Account section */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 12 }}>
                Your Account
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C8923C')}
                    onBlur={e => (e.target.style.borderColor = '#1E1A17')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => update('email', e.target.value)}
                    autoComplete="email"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C8923C')}
                    onBlur={e => (e.target.style.borderColor = '#1E1A17')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={e => update('password', e.target.value)}
                    autoComplete="new-password"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#C8923C')}
                    onBlur={e => (e.target.style.borderColor = '#1E1A17')}
                  />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em', marginTop: 4 }}>
                    8 characters minimum
                  </div>
                </div>
              </div>
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
              }}
            >
              {loading ? 'Creating...' : 'Create account'}
            </button>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.08em', lineHeight: 1.8, textAlign: 'center' }}>
              By creating an account you agree to our{' '}
              <Link href="/terms" style={{ color: '#6B5E52' }}>Terms of Use</Link>
              {' '}and{' '}
              <Link href="/privacy" style={{ color: '#6B5E52' }}>Privacy Policy</Link>.
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.1em' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#C8923C' }}>Sign in →</Link>
        </p>
      </div>
    </div>
  )
}
