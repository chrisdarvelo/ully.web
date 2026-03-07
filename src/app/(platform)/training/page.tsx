'use client'

import { useState, useEffect, useCallback } from 'react'

interface TeamMember { id: string; name: string; role: string }
interface TrainingLog {
  id: string
  memberId: string
  memberName: string
  date: number
  topic: string
  description: string | null
  score: number | null
  trainer: string | null
  notes: string | null
}

const TOPICS = [
  { value: 'espresso_technique', label: 'Espresso Technique' },
  { value: 'latte_art', label: 'Latte Art' },
  { value: 'cupping', label: 'Cupping & Tasting' },
  { value: 'equipment', label: 'Equipment Operation' },
  { value: 'customer_service', label: 'Customer Service' },
  { value: 'food_safety', label: 'Food Safety' },
  { value: 'roasting', label: 'Roasting' },
  { value: 'brew_methods', label: 'Brew Methods' },
  { value: 'other', label: 'Other' },
]

const TOPIC_LABELS: Record<string, string> = Object.fromEntries(TOPICS.map(t => [t.value, t.label]))

function ScoreBadge({ score }: { score: number | null }) {
  if (score === null) return <span style={{ color: '#4A4440', fontFamily: 'var(--font-mono)', fontSize: 10 }}>—</span>
  const color = score >= 4 ? '#6EAB7E' : score >= 3 ? '#C8923C' : '#E07070'
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, fontWeight: 700 }}>
      {'★'.repeat(score)}{'☆'.repeat(5 - score)}
    </span>
  )
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const EMPTY_FORM = {
  memberId: '',
  date: new Date().toISOString().slice(0, 10),
  topic: 'espresso_technique',
  description: '',
  score: '',
  trainer: '',
  notes: '',
}

export default function TrainingPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [logs, setLogs] = useState<TrainingLog[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [filterMember, setFilterMember] = useState('all')
  const [filterTopic, setFilterTopic] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    const [teamRes, logRes] = await Promise.all([
      fetch('/api/team'),
      fetch('/api/training'),
    ])
    if (teamRes.ok) {
      const members = await teamRes.json()
      setTeam(members.filter((m: { status: string }) => m.status === 'active'))
    }
    if (logRes.ok) setLogs(await logRes.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function handleSave() {
    if (!form.memberId || !form.date || !form.topic) {
      setError('Member, date, and topic are required.')
      return
    }
    setSaving(true); setError('')
    const member = team.find(m => m.id === form.memberId)
    const res = await fetch('/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        memberId: form.memberId,
        memberName: member?.name ?? '',
        date: new Date(form.date).getTime(),
        topic: form.topic,
        description: form.description || null,
        score: form.score ? Number(form.score) : null,
        trainer: form.trainer || null,
        notes: form.notes || null,
      }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setShowForm(false)
    setForm(EMPTY_FORM)
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this training log?')) return
    await fetch('/api/training', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const inp: React.CSSProperties = { width: '100%', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 5 }

  const displayed = logs.filter(l => {
    if (filterMember !== 'all' && l.memberId !== filterMember) return false
    if (filterTopic !== 'all' && l.topic !== filterTopic) return false
    return true
  })

  // Stats
  const totalSessions = logs.length
  const avgScore = logs.filter(l => l.score !== null).length > 0
    ? logs.filter(l => l.score !== null).reduce((s, l) => s + (l.score ?? 0), 0) / logs.filter(l => l.score !== null).length
    : null

  const topicCounts = TOPICS.map(t => ({
    ...t,
    count: logs.filter(l => l.topic === t.value).length,
  })).filter(t => t.count > 0).sort((a, b) => b.count - a.count)

  return (
    <div style={{ padding: 40, maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Training</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Staff Development</h1>
        </div>
        <button
          onClick={() => { setShowForm(v => !v); setError('') }}
          style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '9px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          + Log Session
        </button>
      </div>

      {/* Summary cards */}
      {totalSessions > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '16px 20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 8 }}>Total Sessions</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#C8923C' }}>{totalSessions}</div>
          </div>
          <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '16px 20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 8 }}>Avg Score</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: avgScore !== null ? (avgScore >= 4 ? '#6EAB7E' : avgScore >= 3 ? '#C8923C' : '#E07070') : '#4A4440' }}>
              {avgScore !== null ? avgScore.toFixed(1) : '—'}
            </div>
          </div>
          <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '16px 20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 8 }}>Top Topic</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#C4B8AA', marginTop: 4 }}>
              {topicCounts[0]?.label ?? '—'}
            </div>
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div style={{ background: '#1A1614', border: '1px solid #C8923C', borderRadius: 4, padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>New Training Session</div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Team Member *</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.memberId} onChange={e => setForm(p => ({ ...p, memberId: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                <option value="" style={{ background: '#1A1614' }}>Select member</option>
                {team.map(m => <option key={m.id} value={m.id} style={{ background: '#1A1614' }}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Date *</label>
              <input type="date" style={inp} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
            <div>
              <label style={lbl}>Topic *</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.topic} onChange={e => setForm(p => ({ ...p, topic: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                {TOPICS.map(t => <option key={t.value} value={t.value} style={{ background: '#1A1614' }}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Score (1–5)</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.score} onChange={e => setForm(p => ({ ...p, score: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                <option value="" style={{ background: '#1A1614' }}>No score</option>
                {[1, 2, 3, 4, 5].map(n => <option key={n} value={n} style={{ background: '#1A1614' }}>{n} — {'★'.repeat(n)}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Description</label>
              <input style={inp} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="What was covered?" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
            <div>
              <label style={lbl}>Trainer / Evaluator</label>
              <input style={inp} value={form.trainer} onChange={e => setForm(p => ({ ...p, trainer: e.target.value }))} placeholder="Name" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Notes</label>
            <input style={inp} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Additional notes" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 12 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => { setShowForm(false); setError('') }} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      {logs.length > 0 && (
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <select
            style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 3, padding: '6px 10px', color: '#6B5E52', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', outline: 'none', cursor: 'pointer' }}
            value={filterMember}
            onChange={e => setFilterMember(e.target.value)}
          >
            <option value="all">All members</option>
            {team.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <select
            style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 3, padding: '6px 10px', color: '#6B5E52', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', outline: 'none', cursor: 'pointer' }}
            value={filterTopic}
            onChange={e => setFilterTopic(e.target.value)}
          >
            <option value="all">All topics</option>
            {TOPICS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {(filterMember !== 'all' || filterTopic !== 'all') && (
            <button onClick={() => { setFilterMember('all'); setFilterTopic('all') }} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}>Clear filters</button>
          )}
        </div>
      )}

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>Loading...</div>
      ) : team.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>
          Add team members first.{' '}
          <a href="/team" style={{ color: '#C8923C' }}>Go to Team →</a>
        </div>
      ) : logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>No training sessions logged</div>
          <button onClick={() => setShowForm(true)} style={{ background: 'none', color: '#C8923C', border: '1px solid rgba(200,146,60,0.4)', borderRadius: 3, padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Log first session</button>
        </div>
      ) : (
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr 3fr 1fr auto', gap: 12, padding: '10px 20px', borderBottom: '1px solid #1E1A17' }}>
            {['Date', 'Member', 'Topic', 'Description', 'Score', ''].map(h => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440' }}>{h}</div>
            ))}
          </div>
          {displayed.length === 0 ? (
            <div style={{ padding: '24px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>No results for current filters.</div>
          ) : displayed.map(log => (
            <div
              key={log.id}
              style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr 3fr 1fr auto', gap: 12, padding: '12px 20px', borderBottom: '1px solid #1E1A17', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1E1B18')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>{formatDate(log.date)}</div>
              <div>
                <div style={{ fontSize: 13, color: '#C4B8AA', fontWeight: 500 }}>{log.memberName}</div>
                {log.trainer && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', marginTop: 2 }}>by {log.trainer}</div>}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6B5E52', letterSpacing: '0.06em' }}>{TOPIC_LABELS[log.topic] ?? log.topic}</div>
              <div style={{ fontSize: 12, color: '#C4B8AA' }}>{log.description ?? log.notes ?? '—'}</div>
              <ScoreBadge score={log.score} />
              <button onClick={() => handleDelete(log.id)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Del</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
