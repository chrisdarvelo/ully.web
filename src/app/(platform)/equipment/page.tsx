'use client'

import { useState, useEffect, useCallback } from 'react'

interface Equipment {
  id: string
  name: string
  type: string
  brand: string | null
  model: string | null
  serial: string | null
  status: string
  lastService: number | null
  notes: string | null
  createdAt: number
}

const TYPES = ['espresso_machine', 'grinder', 'brewer', 'roaster', 'refrigeration', 'blender', 'other']
const STATUSES = ['active', 'maintenance', 'retired']

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string }> = {
    active: { label: 'Active', cls: 'badge badge-active' },
    maintenance: { label: 'Maintenance', cls: 'badge badge-maint' },
    retired: { label: 'Retired', cls: 'badge badge-retired' },
  }
  const { label, cls } = map[status] ?? { label: status, cls: 'badge' }
  return <span className={cls}>{label}</span>
}

function formatDate(ts: number | null) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function typeLabel(type: string) {
  return type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

const EMPTY_FORM = { name: '', type: 'espresso_machine', brand: '', model: '', serial: '', status: 'active', notes: '' }

export default function EquipmentPage() {
  const [items, setItems] = useState<Equipment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/equipment')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function startAdd() {
    setForm(EMPTY_FORM)
    setEditId(null)
    setError('')
    setShowForm(true)
  }

  function startEdit(item: Equipment) {
    setForm({
      name: item.name,
      type: item.type,
      brand: item.brand ?? '',
      model: item.model ?? '',
      serial: item.serial ?? '',
      status: item.status,
      notes: item.notes ?? '',
    })
    setEditId(item.id)
    setError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Name is required.'); return }
    setSaving(true)
    setError('')
    const method = editId ? 'PUT' : 'POST'
    const body = editId ? { ...form, id: editId } : form
    const res = await fetch('/api/equipment', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setShowForm(false)
    setEditId(null)
    setSaving(false)
    load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this equipment record?')) return
    await fetch('/api/equipment', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const inp: React.CSSProperties = { width: '100%', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 5 }

  return (
    <div style={{ padding: 40, maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Equipment</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Machine Registry</h1>
        </div>
        <button
          onClick={startAdd}
          style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '9px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          + Add Equipment
        </button>
      </div>

      {/* Add/Edit form */}
      {showForm && (
        <div style={{ background: '#1A1614', border: '1px solid #C8923C', borderRadius: 4, padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            {editId ? 'Edit Equipment' : 'New Equipment'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Name *</label>
              <input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="La Marzocca Linea PB" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
            <div>
              <label style={lbl}>Type</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                {TYPES.map(t => <option key={t} value={t} style={{ background: '#1A1614' }}>{typeLabel(t)}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Status</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                {STATUSES.map(s => <option key={s} value={s} style={{ background: '#1A1614' }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Brand</label>
              <input style={inp} value={form.brand} onChange={e => setForm(p => ({ ...p, brand: e.target.value }))} placeholder="La Marzocco" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
            <div>
              <label style={lbl}>Model</label>
              <input style={inp} value={form.model} onChange={e => setForm(p => ({ ...p, model: e.target.value }))} placeholder="Linea PB" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
            <div>
              <label style={lbl}>Serial Number</label>
              <input style={inp} value={form.serial} onChange={e => setForm(p => ({ ...p, serial: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Notes</label>
            <textarea style={{ ...inp, minHeight: 60, resize: 'vertical' }} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 12 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.12em' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>No equipment registered</div>
          <div style={{ fontSize: 14, color: '#4A4440', marginBottom: 24 }}>Add your espresso machines, grinders, brewers, and more.</div>
          <button onClick={startAdd} style={{ background: 'none', color: '#C8923C', border: '1px solid rgba(200,146,60,0.4)', borderRadius: 3, padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
            + Add first equipment
          </button>
        </div>
      ) : (
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', gap: 16, padding: '10px 20px', borderBottom: '1px solid #1E1A17' }}>
            {['Name', 'Type', 'Brand / Model', 'Last Service', 'Status', ''].map(h => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440' }}>{h}</div>
            ))}
          </div>
          {items.map(item => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', gap: 16, padding: '14px 20px', borderBottom: '1px solid #1E1A17', alignItems: 'center', transition: 'background 0.1s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1E1B18')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <div style={{ fontSize: 14, color: '#C4B8AA', fontWeight: 500 }}>{item.name}</div>
                {item.serial && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.08em', marginTop: 2 }}>S/N {item.serial}</div>}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6B5E52', letterSpacing: '0.06em' }}>{typeLabel(item.type)}</div>
              <div style={{ fontSize: 13, color: '#6B5E52' }}>{[item.brand, item.model].filter(Boolean).join(' ') || '—'}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>{formatDate(item.lastService)}</div>
              <div><StatusBadge status={item.status} /></div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => startEdit(item)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', letterSpacing: '0.1em' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', letterSpacing: '0.1em' }}>Del</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
