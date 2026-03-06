'use client'

import { useState, useEffect, useCallback } from 'react'

interface Item {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  parLevel: number | null
  costPerUnit: number | null
  supplier: string | null
  sku: string | null
  updatedAt: number
}

const CATEGORIES = ['coffee', 'milk', 'cups', 'lids', 'syrups', 'pastries', 'cleaning', 'maintenance', 'other']
const UNITS = ['kg', 'lbs', 'g', 'oz', 'liters', 'ml', 'units', 'bags', 'cases', 'boxes']

const EMPTY_FORM = { name: '', category: 'coffee', quantity: '', unit: 'kg', parLevel: '', costPerUnit: '', supplier: '', sku: '' }

function isLow(item: Item) {
  return item.parLevel !== null && item.quantity <= item.parLevel
}

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editId, setEditId] = useState<string | null>(null)
  const [filterCat, setFilterCat] = useState('all')

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/inventory')
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function startAdd() { setForm(EMPTY_FORM); setEditId(null); setError(''); setShowForm(true) }

  function startEdit(item: Item) {
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity.toString(),
      unit: item.unit,
      parLevel: item.parLevel?.toString() ?? '',
      costPerUnit: item.costPerUnit?.toString() ?? '',
      supplier: item.supplier ?? '',
      sku: item.sku ?? '',
    })
    setEditId(item.id)
    setError('')
    setShowForm(true)
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Name is required.'); return }
    setSaving(true)
    const method = editId ? 'PUT' : 'POST'
    const body = editId ? { ...form, id: editId } : form
    const res = await fetch('/api/inventory', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setShowForm(false); setEditId(null); setSaving(false); load()
  }

  async function handleDelete(id: string) {
    if (!confirm('Remove this inventory item?')) return
    await fetch('/api/inventory', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    load()
  }

  const inp: React.CSSProperties = { width: '100%', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 5 }

  const displayed = filterCat === 'all' ? items : items.filter(i => i.category === filterCat)
  const lowCount = items.filter(isLow).length

  return (
    <div style={{ padding: 40, maxWidth: 1100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Inventory</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>
            Stock Management
            {lowCount > 0 && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#E07070', marginLeft: 12, fontWeight: 400 }}>{lowCount} low</span>}
          </h1>
        </div>
        <button onClick={startAdd} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '9px 18px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Item
        </button>
      </div>

      {showForm && (
        <div style={{ background: '#1A1614', border: '1px solid #C8923C', borderRadius: 4, padding: 24, marginBottom: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 20 }}>
            {editId ? 'Edit Item' : 'New Inventory Item'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div><label style={lbl}>Item Name *</label><input style={inp} value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Ethiopia Yirgacheffe" onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div>
              <label style={lbl}>Category</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1A1614' }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Unit</label>
              <select style={{ ...inp, cursor: 'pointer' }} value={form.unit} onChange={e => setForm(p => ({ ...p, unit: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                {UNITS.map(u => <option key={u} value={u} style={{ background: '#1A1614' }}>{u}</option>)}
              </select>
            </div>
            <div><label style={lbl}>Current Quantity</label><input type="number" step="0.01" style={inp} value={form.quantity} onChange={e => setForm(p => ({ ...p, quantity: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Par Level (min stock)</label><input type="number" step="0.01" style={inp} value={form.parLevel} onChange={e => setForm(p => ({ ...p, parLevel: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>Cost Per Unit ($)</label><input type="number" step="0.01" style={inp} value={form.costPerUnit} onChange={e => setForm(p => ({ ...p, costPerUnit: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div style={{ gridColumn: '1 / 2' }}><label style={lbl}>Supplier</label><input style={inp} value={form.supplier} onChange={e => setForm(p => ({ ...p, supplier: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
            <div><label style={lbl}>SKU</label><input style={inp} value={form.sku} onChange={e => setForm(p => ({ ...p, sku: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
          </div>
          {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 12 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: '#C8923C', color: '#0E0C0A', border: 'none', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
            <button onClick={() => { setShowForm(false); setEditId(null) }} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '8px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Category filter */}
      {items.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {['all', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 10px', borderRadius: 2, border: '1px solid', cursor: 'pointer', background: filterCat === cat ? '#C8923C' : 'transparent', color: filterCat === cat ? '#0E0C0A' : '#4A4440', borderColor: filterCat === cat ? '#C8923C' : '#1E1A17' }}>
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>No inventory items</div>
          <button onClick={startAdd} style={{ background: 'none', color: '#C8923C', border: '1px solid rgba(200,146,60,0.4)', borderRadius: 3, padding: '10px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Add first item</button>
        </div>
      ) : (
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr auto', gap: 12, padding: '10px 20px', borderBottom: '1px solid #1E1A17' }}>
            {['Item', 'Category', 'Quantity', 'Par Level', 'Cost/Unit', 'Supplier', ''].map(h => (
              <div key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440' }}>{h}</div>
            ))}
          </div>
          {displayed.map(item => {
            const low = isLow(item)
            return (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr auto', gap: 12, padding: '12px 20px', borderBottom: '1px solid #1E1A17', alignItems: 'center', background: low ? 'rgba(200,64,64,0.04)' : 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = low ? 'rgba(200,64,64,0.08)' : '#1E1B18')}
                onMouseLeave={e => (e.currentTarget.style.background = low ? 'rgba(200,64,64,0.04)' : 'transparent')}
              >
                <div>
                  <div style={{ fontSize: 13, color: '#C4B8AA', fontWeight: 500 }}>{item.name}</div>
                  {item.sku && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', marginTop: 2 }}>SKU {item.sku}</div>}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6B5E52', letterSpacing: '0.06em', textTransform: 'capitalize' }}>{item.category}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: low ? '#E07070' : '#C4B8AA', fontWeight: low ? 700 : 400 }}>
                  {item.quantity} {item.unit}
                  {low && <span style={{ marginLeft: 6, fontSize: 8, color: '#E07070' }}>LOW</span>}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440' }}>{item.parLevel ? `${item.parLevel} ${item.unit}` : '—'}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440' }}>{item.costPerUnit ? `$${item.costPerUnit}` : '—'}</div>
                <div style={{ fontSize: 12, color: '#4A4440' }}>{item.supplier ?? '—'}</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => startEdit(item)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Del</button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
