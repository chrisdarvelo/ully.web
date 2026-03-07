'use client'

import { useState, useEffect, useCallback } from 'react'

interface TeamMember { id: string; name: string; role: string; hourlyRate?: number | null }
interface Shift {
  id: string
  memberId: string
  memberName: string
  date: number
  shiftStart: string
  shiftEnd: string
  position: string | null
  notes: string | null
}

function getWeekDays(anchor: Date) {
  const days: Date[] = []
  const mon = new Date(anchor)
  mon.setDate(anchor.getDate() - ((anchor.getDay() + 6) % 7)) // Monday
  for (let i = 0; i < 7; i++) {
    const d = new Date(mon)
    d.setDate(mon.getDate() + i)
    days.push(d)
  }
  return days
}

function dayStart(d: Date) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

export default function SchedulePage() {
  const [anchor, setAnchor] = useState(() => new Date())
  const [team, setTeam] = useState<TeamMember[]>([])
  const [shifts, setShifts] = useState<Shift[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ memberId: '', date: '', shiftStart: '07:00', shiftEnd: '15:00', position: '', notes: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const weekDays = getWeekDays(anchor)
  const weekStart = dayStart(weekDays[0])
  const weekEnd = dayStart(weekDays[6]) + 86399999

  const load = useCallback(async () => {
    setLoading(true)
    const [teamRes, shiftRes] = await Promise.all([
      fetch('/api/team'),
      fetch(`/api/schedule?start=${weekStart}&end=${weekEnd}`)
    ])
    if (teamRes.ok) {
      const members = await teamRes.json()
      setTeam(members.filter((m: { status: string }) => m.status === 'active'))
    }
    if (shiftRes.ok) setShifts(await shiftRes.json())
    setLoading(false)
  }, [weekStart, weekEnd])

  useEffect(() => { load() }, [load])

  function prevWeek() { const d = new Date(anchor); d.setDate(d.getDate() - 7); setAnchor(d) }
  function nextWeek() { const d = new Date(anchor); d.setDate(d.getDate() + 7); setAnchor(d) }

  async function handleSave() {
    if (!form.memberId || !form.date) { setError('Member and date are required.'); return }
    setSaving(true); setError('')
    const res = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: new Date(form.date + 'T00:00:00').getTime() })
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setShowForm(false)
    setSaving(false)
    setForm({ memberId: '', date: '', shiftStart: '07:00', shiftEnd: '15:00', position: '', notes: '' })
    load()
  }

  async function deleteShift(id: string) {
    if (!confirm('Remove this shift?')) return
    await fetch('/api/schedule', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const inp: React.CSSProperties = { width: '100%', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 5 }

  const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  function shiftHours(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    const mins = (eh * 60 + em) - (sh * 60 + sm)
    return Math.max(0, mins / 60)
  }

  // Labor cost summary per member for the week
  const laborRows = team.map(member => {
    const memberShifts = shifts.filter(s => s.memberId === member.id)
    const hours = memberShifts.reduce((acc, s) => acc + shiftHours(s.shiftStart, s.shiftEnd), 0)
    const cost = member.hourlyRate ? hours * member.hourlyRate : null
    return { member, hours, cost }
  }).filter(r => r.hours > 0)

  const totalLaborCost = laborRows.reduce((s, r) => s + (r.cost ?? 0), 0)
  const totalHours = laborRows.reduce((s, r) => s + r.hours, 0)

  return (
    <div style={{ padding: 40, maxWidth: 1200 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Schedule</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Weekly Schedule</h1>
        </div>
        <button onClick={() => setShowForm(v => !v)} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '9px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Shift
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1A1614', border: '1px solid #C8923C', borderRadius: 4, padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>New Shift</div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Team Member *</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.memberId} onChange={e => setForm(p => ({ ...p, memberId: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                <option value="" style={{ background: '#1A1614' }}>Select member</option>
                {team.map(m => <option key={m.id} value={m.id} style={{ background: '#1A1614' }}>{m.name} — {m.role}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Date *</label><input type="date" style={inp} value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Start</label><input type="time" style={inp} value={form.shiftStart} onChange={e => setForm(p => ({ ...p, shiftStart: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>End</label><input type="time" style={inp} value={form.shiftEnd} onChange={e => setForm(p => ({ ...p, shiftEnd: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Position</label><input style={inp} value={form.position} onChange={e => setForm(p => ({ ...p, position: e.target.value }))} placeholder="Bar lead" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
          </div>
          {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 10 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Week navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <button onClick={prevWeek} style={{ background: 'none', border: '1px solid #1E1A17', borderRadius: 3, padding: '6px 12px', color: '#4A4440', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer' }}>←</button>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: '#C4B8AA' }}>
          {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <button onClick={nextWeek} style={{ background: 'none', border: '1px solid #1E1A17', borderRadius: 3, padding: '6px 12px', color: '#4A4440', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'pointer' }}>→</button>
        <button onClick={() => setAnchor(new Date())} style={{ background: 'none', border: '1px solid #1E1A17', borderRadius: 3, padding: '6px 10px', color: '#4A4440', fontFamily: 'var(--font-mono)', fontSize: 9, cursor: 'pointer', letterSpacing: '0.1em' }}>Today</button>
      </div>

      {/* Labor cost summary */}
      {!loading && laborRows.length > 0 && (
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '16px 20px', marginBottom: 16, display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 6 }}>Weekly Hours</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#C4B8AA', fontWeight: 700 }}>{totalHours.toFixed(1)}h</div>
          </div>
          {totalLaborCost > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 6 }}>Est. Labor Cost</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 18, color: '#C8923C', fontWeight: 700 }}>
                ${totalLaborCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
          )}
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 8 }}>By Member</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {laborRows.map(r => (
                <div key={r.member.id} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#6B5E52', minWidth: 120 }}>{r.member.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>{r.hours.toFixed(1)}h</span>
                  {r.cost !== null && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>
                      ${r.cost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  )}
                  {r.member.hourlyRate === null && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#2A2218' }}>no rate set</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>Loading...</div>
      ) : team.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>
          Add team members first to build schedules.{' '}
          <a href="/team" style={{ color: '#C8923C' }}>Go to Team →</a>
        </div>
      ) : (
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: `160px repeat(7, 1fr)`, borderBottom: '1px solid #1E1A17' }}>
            <div style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', color: '#4A4440', textTransform: 'uppercase' }}>Member</div>
            {weekDays.map((d, i) => {
              const isToday = dayStart(d) === dayStart(new Date())
              return (
                <div key={i} style={{ padding: '10px 8px', textAlign: 'center', borderLeft: '1px solid #1E1A17', background: isToday ? 'rgba(200,146,60,0.05)' : 'transparent' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: isToday ? '#C8923C' : '#4A4440' }}>{DAY_LABELS[i]}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: isToday ? '#C8923C' : '#6B5E52', marginTop: 2 }}>{d.getDate()}</div>
                </div>
              )
            })}
          </div>

          {/* Rows per team member */}
          {team.map(member => (
            <div key={member.id} style={{ display: 'grid', gridTemplateColumns: `160px repeat(7, 1fr)`, borderBottom: '1px solid #1E1A17', minHeight: 60 }}>
              <div style={{ padding: '14px 16px', borderRight: '1px solid #1E1A17', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 12, color: '#C4B8AA', fontWeight: 500 }}>{member.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.06em', marginTop: 2 }}>{member.role}</div>
              </div>
              {weekDays.map((d, di) => {
                const dayTs = dayStart(d)
                const dayShifts = shifts.filter(s => s.memberId === member.id && dayStart(new Date(s.date)) === dayTs)
                const isToday = dayTs === dayStart(new Date())
                return (
                  <div key={di} style={{ padding: '6px', borderLeft: '1px solid #1E1A17', background: isToday ? 'rgba(200,146,60,0.03)' : 'transparent', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {dayShifts.map(shift => (
                      <div key={shift.id} style={{ background: 'rgba(200,146,60,0.12)', border: '1px solid rgba(200,146,60,0.2)', borderRadius: 2, padding: '4px 6px', cursor: 'pointer' }}
                        onClick={() => deleteShift(shift.id)}
                        title="Click to remove"
                      >
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#C8923C', letterSpacing: '0.06em' }}>{shift.shiftStart}–{shift.shiftEnd}</div>
                        {shift.position && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 7, color: '#6B5E52', marginTop: 1 }}>{shift.position}</div>}
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#2A2218', marginTop: 8, letterSpacing: '0.1em' }}>Click a shift to remove it</div>
    </div>
  )
}
