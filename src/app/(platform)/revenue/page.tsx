'use client'

import { useState, useEffect, useCallback } from 'react'

interface RevenueRecord {
  id: string
  date: number
  amount: number
  category: string
  description: string | null
  paymentMethod: string | null
}

interface ExpenseRecord {
  id: string
  date: number
  amount: number
  category: string
  vendor: string | null
  description: string | null
}

const REV_CATEGORIES = ['drinks', 'food', 'retail', 'wholesale', 'events', 'other']
const EXP_CATEGORIES = ['supplies', 'coffee', 'labor', 'rent', 'utilities', 'equipment', 'marketing', 'other']
const PAYMENT_METHODS = ['card', 'cash', 'mobile', 'invoice', 'other']

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type Tab = 'overview' | 'revenue' | 'expenses'

export default function RevenuePage() {
  const [tab, setTab] = useState<Tab>('overview')
  const [revenue, setRevenue] = useState<RevenueRecord[]>([])
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([])
  const [loading, setLoading] = useState(true)

  // Forms
  const [showRevForm, setShowRevForm] = useState(false)
  const [showExpForm, setShowExpForm] = useState(false)
  const [revForm, setRevForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: '', category: 'drinks', description: '', paymentMethod: 'card' })
  const [expForm, setExpForm] = useState({ date: new Date().toISOString().slice(0, 10), amount: '', category: 'supplies', vendor: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const [revRes, expRes] = await Promise.all([
      fetch('/api/revenue?type=revenue'),
      fetch('/api/revenue?type=expenses'),
    ])
    if (revRes.ok) setRevenue(await revRes.json())
    if (expRes.ok) setExpenses(await expRes.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const totalRevenue = revenue.reduce((s, r) => s + r.amount, 0)
  const totalExpenses = expenses.reduce((s, r) => s + r.amount, 0)
  const profit = totalRevenue - totalExpenses
  const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0

  // Monthly breakdown (last 6 months)
  const now = new Date()
  const months: { label: string; rev: number; exp: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const label = d.toLocaleDateString('en-US', { month: 'short' })
    const start = d.getTime()
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59).getTime()
    const rev = revenue.filter(r => r.date >= start && r.date <= end).reduce((s, r) => s + r.amount, 0)
    const exp = expenses.filter(r => r.date >= start && r.date <= end).reduce((s, r) => s + r.amount, 0)
    months.push({ label, rev, exp })
  }
  const maxBar = Math.max(...months.map(m => Math.max(m.rev, m.exp)), 1)

  async function saveRevenue() {
    if (!revForm.amount) { setError('Amount is required.'); return }
    setSaving(true); setError('')
    const res = await fetch('/api/revenue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'revenue', ...revForm, date: new Date(revForm.date).getTime() })
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setShowRevForm(false)
    setSaving(false)
    setRevForm({ date: new Date().toISOString().slice(0, 10), amount: '', category: 'drinks', description: '', paymentMethod: 'card' })
    load()
  }

  async function saveExpense() {
    if (!expForm.amount) { setError('Amount is required.'); return }
    setSaving(true); setError('')
    const res = await fetch('/api/revenue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'expense', ...expForm, date: new Date(expForm.date).getTime() })
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error ?? 'Save failed'); setSaving(false); return }
    setShowExpForm(false)
    setSaving(false)
    setExpForm({ date: new Date().toISOString().slice(0, 10), amount: '', category: 'supplies', vendor: '', description: '' })
    load()
  }

  async function deleteRecord(id: string, type: 'revenue' | 'expense') {
    if (!confirm(`Delete this ${type} record?`)) return
    await fetch('/api/revenue', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, type }) })
    load()
  }

  const inp: React.CSSProperties = { width: '100%', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none' }
  const lbl: React.CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 5 }
  const tabBtn = (t: Tab): React.CSSProperties => ({ background: 'none', border: 'none', borderBottom: tab === t ? '1px solid #C8923C' : '1px solid transparent', padding: '8px 0', marginRight: 24, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: tab === t ? '#C8923C' : '#4A4440', cursor: 'pointer' })

  return (
    <div style={{ padding: 40, maxWidth: 1100 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Revenue</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 20 }}>Financial Overview</h1>
        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #1E1A17', display: 'flex' }}>
          <button style={tabBtn('overview')} onClick={() => setTab('overview')}>Overview</button>
          <button style={tabBtn('revenue')} onClick={() => setTab('revenue')}>Revenue</button>
          <button style={tabBtn('expenses')} onClick={() => setTab('expenses')}>Expenses</button>
        </div>
      </div>

      {loading ? (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>Loading...</div>
      ) : (
        <>
          {tab === 'overview' && (
            <div>
              {/* Summary metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
                {[
                  { label: 'Total Revenue', value: formatCurrency(totalRevenue), color: '#4A8C5C' },
                  { label: 'Total Expenses', value: formatCurrency(totalExpenses), color: '#C84040' },
                  { label: 'Net Profit', value: formatCurrency(profit), color: profit >= 0 ? '#4A8C5C' : '#C84040' },
                  { label: 'Profit Margin', value: `${margin.toFixed(1)}%`, color: margin >= 20 ? '#4A8C5C' : margin >= 0 ? '#C89040' : '#C84040' },
                ].map(m => (
                  <div key={m.label} style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '18px 20px' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 10 }}>{m.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: m.color, letterSpacing: '-0.02em' }}>{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Monthly bar chart */}
              <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: 24, marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA', marginBottom: 24 }}>
                  6-Month Trend
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120 }}>
                  {months.map(m => (
                    <div key={m.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: '100%', display: 'flex', gap: 3, alignItems: 'flex-end', height: 96 }}>
                        <div style={{ flex: 1, background: 'rgba(74,140,92,0.4)', borderRadius: '2px 2px 0 0', height: `${(m.rev / maxBar) * 100}%`, minHeight: m.rev > 0 ? 3 : 0 }} title={`Revenue: ${formatCurrency(m.rev)}`} />
                        <div style={{ flex: 1, background: 'rgba(200,64,64,0.4)', borderRadius: '2px 2px 0 0', height: `${(m.exp / maxBar) * 100}%`, minHeight: m.exp > 0 ? 3 : 0 }} title={`Expenses: ${formatCurrency(m.exp)}`} />
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em' }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, background: 'rgba(74,140,92,0.4)', borderRadius: 1 }} /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em' }}>Revenue</span></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 8, height: 8, background: 'rgba(200,64,64,0.4)', borderRadius: 1 }} /><span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em' }}>Expenses</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => { setTab('revenue'); setShowRevForm(true) }} style={{ background: 'rgba(74,140,92,0.1)', color: '#6EAB7E', border: '1px solid rgba(74,140,92,0.3)', borderRadius: 3, padding: '9px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Log Revenue</button>
                <button onClick={() => { setTab('expenses'); setShowExpForm(true) }} style={{ background: 'rgba(200,64,64,0.08)', color: '#E07070', border: '1px solid rgba(200,64,64,0.2)', borderRadius: 3, padding: '9px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Log Expense</button>
              </div>
            </div>
          )}

          {tab === 'revenue' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A8C5C' }}>Total: {formatCurrency(totalRevenue)}</div>
                <button onClick={() => setShowRevForm(v => !v)} style={{ background: 'rgba(74,140,92,0.1)', color: '#6EAB7E', border: '1px solid rgba(74,140,92,0.3)', borderRadius: 3, padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Log Revenue</button>
              </div>

              {showRevForm && (
                <div style={{ background: '#1A1614', border: '1px solid rgba(74,140,92,0.4)', borderRadius: 4, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div><label style={lbl}>Date</label><input type="date" style={inp} value={revForm.date} onChange={e => setRevForm(p => ({ ...p, date: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                    <div><label style={lbl}>Amount ($) *</label><input type="number" step="0.01" style={inp} value={revForm.amount} onChange={e => setRevForm(p => ({ ...p, amount: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                    <div><label style={lbl}>Category</label>
                      <select style={{ ...inp, cursor: 'pointer' }} value={revForm.category} onChange={e => setRevForm(p => ({ ...p, category: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                        {REV_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1A1614' }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                      </select>
                    </div>
                    <div><label style={lbl}>Description</label><input style={inp} value={revForm.description} onChange={e => setRevForm(p => ({ ...p, description: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                    <div><label style={lbl}>Payment</label>
                      <select style={{ ...inp, cursor: 'pointer' }} value={revForm.paymentMethod} onChange={e => setRevForm(p => ({ ...p, paymentMethod: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                        {PAYMENT_METHODS.map(m => <option key={m} value={m} style={{ background: '#1A1614' }}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>)}
                      </select>
                    </div>
                  </div>
                  {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 10 }}>{error}</div>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={saveRevenue} disabled={saving} style={{ background: 'rgba(74,140,92,0.2)', color: '#6EAB7E', border: '1px solid rgba(74,140,92,0.4)', borderRadius: 3, padding: '7px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => setShowRevForm(false)} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '7px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              )}

              <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
                {revenue.length === 0 ? (
                  <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>No revenue recorded yet.</div>
                ) : revenue.map(r => (
                  <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr auto', gap: 16, padding: '12px 20px', borderBottom: '1px solid #1E1A17', alignItems: 'center' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#1E1B18')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>{formatDate(r.date)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6B5E52', letterSpacing: '0.06em', textTransform: 'capitalize' }}>{r.category}</div>
                    <div style={{ fontSize: 13, color: '#C4B8AA' }}>{r.description ?? '—'}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#6EAB7E', fontWeight: 700 }}>+{formatCurrency(r.amount)}</div>
                    <button onClick={() => deleteRecord(r.id, 'revenue')} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Del</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'expenses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#C84040' }}>Total: {formatCurrency(totalExpenses)}</div>
                <button onClick={() => setShowExpForm(v => !v)} style={{ background: 'rgba(200,64,64,0.08)', color: '#E07070', border: '1px solid rgba(200,64,64,0.2)', borderRadius: 3, padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>+ Log Expense</button>
              </div>

              {showExpForm && (
                <div style={{ background: '#1A1614', border: '1px solid rgba(200,64,64,0.3)', borderRadius: 4, padding: 20, marginBottom: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr', gap: 12, marginBottom: 12 }}>
                    <div><label style={lbl}>Date</label><input type="date" style={inp} value={expForm.date} onChange={e => setExpForm(p => ({ ...p, date: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                    <div><label style={lbl}>Amount ($) *</label><input type="number" step="0.01" style={inp} value={expForm.amount} onChange={e => setExpForm(p => ({ ...p, amount: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                    <div><label style={lbl}>Category</label>
                      <select style={{ ...inp, cursor: 'pointer' }} value={expForm.category} onChange={e => setExpForm(p => ({ ...p, category: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
                        {EXP_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1A1614' }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                      </select>
                    </div>
                    <div><label style={lbl}>Vendor</label><input style={inp} value={expForm.vendor} onChange={e => setExpForm(p => ({ ...p, vendor: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                    <div><label style={lbl}>Description</label><input style={inp} value={expForm.description} onChange={e => setExpForm(p => ({ ...p, description: e.target.value }))} onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} /></div>
                  </div>
                  {error && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#E07070', marginBottom: 10 }}>{error}</div>}
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={saveExpense} disabled={saving} style={{ background: 'rgba(200,64,64,0.1)', color: '#E07070', border: '1px solid rgba(200,64,64,0.3)', borderRadius: 3, padding: '7px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>{saving ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => setShowExpForm(false)} style={{ background: 'none', color: '#4A4440', border: '1px solid #1E1A17', borderRadius: 3, padding: '7px 14px', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
              )}

              <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
                {expenses.length === 0 ? (
                  <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>No expenses recorded yet.</div>
                ) : expenses.map(r => (
                  <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr auto', gap: 16, padding: '12px 20px', borderBottom: '1px solid #1E1A17', alignItems: 'center' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#1E1B18')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>{formatDate(r.date)}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#6B5E52', letterSpacing: '0.06em', textTransform: 'capitalize' }}>{r.category}</div>
                    <div style={{ fontSize: 12, color: '#6B5E52' }}>{r.vendor ?? '—'}</div>
                    <div style={{ fontSize: 13, color: '#C4B8AA' }}>{r.description ?? '—'}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#E07070', fontWeight: 700 }}>-{formatCurrency(r.amount)}</div>
                    <button onClick={() => deleteRecord(r.id, 'expense')} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Del</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
