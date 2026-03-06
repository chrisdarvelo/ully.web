import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0E0C0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(48px, 10vw, 96px)',
            fontWeight: 700,
            color: '#C8923C',
            letterSpacing: '0.1em',
            opacity: 0.3,
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          404
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#4A4440',
            marginBottom: 32,
          }}
        >
          Page not found
        </div>
        <Link
          href="/dashboard"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#C8923C',
            border: '1px solid rgba(200,146,60,0.3)',
            borderRadius: 3,
            padding: '10px 20px',
          }}
        >
          Go to Dashboard →
        </Link>
      </div>
    </div>
  )
}
