'use client'

import { useState, useEffect, useCallback } from 'react'

interface TeamMember {
  id: string
  name: string
  role: string
  email: string | null
  phone: string | null
  hourlyRate: number | null
  startDate: number | null
  status: string
  notes: string | null
}

const EMPTY_FORM = { name: '', role: '', email: '', phone: '', hourlyRate: '', status: 'active', notes: '' }

function formatDate(ts: number | null) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/team')
    if (res.ok) setMembers(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function startAdd() { setForm(EMPTY_FORM); setEditId(null); setError(''); setShowForm(true) }

  function startEdit(m: TeamMember) {
    setForm({ name: m.name, role: m.role, email: m.email ?? '', phone: m.phone ?? '', hourlyRate: m.hourlyRate?.toString() ?? '', status: m.status, notes: m.notes ?? '' })
    setEditId(m.id)
    setError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim() || !form.role.trim()) { setError('Name and role are required.'); return }
    setSaving(true)
    const method = editId ? 'PUT' : 'POST'
    const body = editId ? { ...form, id: editId } : form
    const res = await fetch('/api/team', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    const wasEdit = !!editId
    setShowForm(false); setEditId(null); setSaving(false)
    setSuccessMsg(wasEdit ? 'Member updated.' : 'Member added.')
    setTimeout(() => setSuccessMsg(''), 3000)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this team member?')) return
    await fetch('/api/team', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const inp: React.CSSProperties = { width: '100%', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 5 }

  const active = members.filter(m => m.status === 'active')
  const inactive = members.filter(m => m.status === 'inactive')

  return (
    <div style={{ padding: 40, maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Team</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>
            Team Members
            {active.length > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#4A4440', marginLeft: 12, fontWeight: 400 }}>{active.length} active</span>}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {successMsg && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6EAB7E' }}>{successMsg}</span>}
          <button onClick={startAdd} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '9px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
            + Add Member
          </button>
        </div>
      </div>

      {showForm && (
        <div style={{ background: '#1A1614', border: '1px solid #C8923C', borderRadius: 4, padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            {editId ? 'Edit Member' : 'New Team Member'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div><label style={lbl}>Full Name *</label><input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Role *</label><input style={inp} value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} placeholder="Head Barista" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div>
              <label style={lbl}>Status</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                <option value="active" style={{ background: '#1A1614' }}>Active</option>
                <option value="inactive" style={{ background: '#1A1614' }}>Inactive</option>
              </select>
            </div>
            <div><label style={lbl}>Email</label><input type="email" style={inp} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Hourly Rate ($)</label><input type="number" step="0.01" style={inp} value={form.hourlyRate} onChange={e => setForm(p => ({ ...p, hourlyRate: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
          </div>
          <div style={{ marginBottom: 14 }}><label style={lbl}>Notes</label><textarea style={{ ...inp, minHeight: 56, resize: 'vertical' }} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
          {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 12 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>Loading...</div>
      ) : members.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>No team members yet</div>
          <button onClick={startAdd} style={{ background: 'none', color: '#C8923C', border: '1px solid rgba(200,146,60,0.4)', borderRadius: 3, padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Add first member</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[{ label: 'Active', list: active }, { label: 'Inactive', list: inactive }].map(({ label, list }) =>
            list.length > 0 && (
              <div key={label}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 10 }}>{label}</div>
                <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
                  {list.map(m => (
                    <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', gap: 16, padding: '14px 20px', borderBottom: '1px solid #1E1A17', alignItems: 'center' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#1E1B18')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div>
                        <div style={{ fontSize: 14, color: '#C4B8AA', fontWeight: 500 }}>{m.name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.06em', marginTop: 2 }}>{m.role}</div>
                      </div>
                      <div style={{ fontSize: 12, color: '#6B5E52' }}>{m.email ?? '—'}</div>
                      <div style={{ fontSize: 12, color: '#6B5E52' }}>{m.phone ?? '—'}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C4B8AA' }}>{m.hourlyRate ? `$${m.hourlyRate}/hr` : '—'}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>{formatDate(m.startDate)}</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => startEdit(m)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(m.id)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Del</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
