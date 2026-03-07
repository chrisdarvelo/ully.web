'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Invite {
  id: string
  code: string
  role: string
  usedBy: string | null
  expiresAt: number
  createdAt: number
}

const ORG_TYPES = [
  { value: 'cafe', label: 'Cafe / Coffee Shop' },
  { value: 'roaster', label: 'Roastery' },
  { value: 'distributor', label: 'Distributor / Importer' },
  { value: 'farm', label: 'Farm / Producer' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

interface SettingsData {
  org: {
    id: string
    name: string
    type: string
    address: string | null
    phone: string | null
    email: string | null
  }
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export default function SettingsPage() {
  const router = useRouter()
  const [data, setData] = useState<SettingsData | null>(null)
  const [loading, setLoading] = useState(true)

  // Org form
  const [orgForm, setOrgForm] = useState({ name: '', type: 'cafe', address: '', phone: '', email: '' })
  const [orgSaving, setOrgSaving] = useState(false)
  const [orgMsg, setOrgMsg] = useState('')

  // Account form
  const [accountForm, setAccountForm] = useState({ name: '', email: '' })
  const [accountSaving, setAccountSaving] = useState(false)
  const [accountMsg, setAccountMsg] = useState('')

  // Password form
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState('')

  // Invites
  const [invites, setInvites] = useState<Invite[]>([])
  const [inviteRole, setInviteRole] = useState('member')
  const [inviteLoading, setInviteLoading] = useState(false)
  const [newCode, setNewCode] = useState<string | null>(null)

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleting, setDeleting] = useState(false)

  const loadInvites = useCallback(async () => {
    const res = await fetch('/api/invites')
    if (res.ok) setInvites(await res.json())
  }, [])

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(d => {
        setData(d)
        setOrgForm({
          name: d.org.name,
          type: d.org.type,
          address: d.org.address ?? '',
          phone: d.org.phone ?? '',
          email: d.org.email ?? '',
        })
        setAccountForm({ name: d.user.name, email: d.user.email })
        setLoading(false)
      })
    loadInvites()
  }, [loadInvites])

  async function saveOrg() {
    setOrgSaving(true); setOrgMsg('')
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'org', ...orgForm }),
    })
    const d = await res.json()
    setOrgMsg(res.ok ? 'Saved.' : (d.error ?? 'Failed.'))
    setOrgSaving(false)
  }

  async function saveAccount() {
    setAccountSaving(true); setAccountMsg('')
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'account', ...accountForm }),
    })
    const d = await res.json()
    setAccountMsg(res.ok ? 'Saved.' : (d.error ?? 'Failed.'))
    setAccountSaving(false)
  }

  async function savePassword() {
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg('Passwords do not match.')
      return
    }
    if (pwForm.newPassword.length < 8) {
      setPwMsg('Password must be at least 8 characters.')
      return
    }
    setPwSaving(true); setPwMsg('')
    const res = await fetch('/api/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target: 'password', ...pwForm }),
    })
    const d = await res.json()
    if (res.ok) {
      setPwMsg('Password updated.')
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } else {
      setPwMsg(d.error ?? 'Failed.')
    }
    setPwSaving(false)
  }

  async function generateInvite() {
    setInviteLoading(true)
    setNewCode(null)
    const res = await fetch('/api/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: inviteRole }),
    })
    const data = await res.json()
    if (res.ok) {
      setNewCode(data.code)
      loadInvites()
    }
    setInviteLoading(false)
  }

  async function revokeInvite(id: string) {
    await fetch('/api/invites', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    loadInvites()
  }

  async function deleteAccount() {
    if (deleteConfirm !== 'DELETE') return
    setDeleting(true)
    await fetch('/api/settings', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const inp: React.CSSProperties = {
    width: '100%',
    background: '#0E0C0A',
    border: '1px solid #1E1A17',
    borderRadius: 3,
    padding: '10px 12px',
    color: 'white',
    fontSize: 14,
    outline: 'none',
  }
  const lbl: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-mono)',
    fontSize: 8,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: '#4A4440',
    marginBottom: 6,
  }
  const section: React.CSSProperties = {
    background: '#1A1614',
    border: '1px solid #1E1A17',
    borderRadius: 4,
    padding: 28,
    marginBottom: 20,
  }
  const sectionTitle: React.CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C8923C',
    marginBottom: 20,
  }
  const btnPrimary: React.CSSProperties = {
    background: '#C8923C',
    color: '#0E0C0A',
    border: 'none',
    borderRadius: 3,
    padding: '9px 18px',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    cursor: 'pointer',
  }

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440' }}>Loading...</div>
      </div>
    )
  }

  return (
    <div style={{ padding: 40, maxWidth: 680 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 6 }}>Settings</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white' }}>Account Settings</h1>
      </div>

      {/* Organization profile */}
      <div style={section}>
        <div style={sectionTitle}>Organization Profile</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em', marginBottom: 20 }}>
          ID: {data?.org.id.slice(0, 8).toUpperCase()}...
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Business Name</label>
            <input style={inp} value={orgForm.name} onChange={e => setOrgForm(p => ({ ...p, name: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          <div>
            <label style={lbl}>Type</label>
            <select style={{ ...inp, cursor: 'pointer' }} value={orgForm.type} onChange={e => setOrgForm(p => ({ ...p, type: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')}>
              {ORG_TYPES.map(t => <option key={t.value} value={t.value} style={{ background: '#1A1614' }}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Phone</label>
            <input style={inp} value={orgForm.phone} onChange={e => setOrgForm(p => ({ ...p, phone: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          <div>
            <label style={lbl}>Business Email</label>
            <input type="email" style={inp} value={orgForm.email} onChange={e => setOrgForm(p => ({ ...p, email: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Address</label>
            <input style={inp} value={orgForm.address} onChange={e => setOrgForm(p => ({ ...p, address: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={saveOrg} disabled={orgSaving} style={btnPrimary}>{orgSaving ? 'Saving...' : 'Save'}</button>
          {orgMsg && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: orgMsg === 'Saved.' ? '#6EAB7E' : '#E07070' }}>{orgMsg}</span>}
        </div>
      </div>

      {/* Account */}
      <div style={section}>
        <div style={sectionTitle}>Your Account</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
          <div>
            <label style={lbl}>Full Name</label>
            <input style={inp} value={accountForm.name} onChange={e => setAccountForm(p => ({ ...p, name: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          <div>
            <label style={lbl}>Email</label>
            <input type="email" style={inp} value={accountForm.email} onChange={e => setAccountForm(p => ({ ...p, email: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={saveAccount} disabled={accountSaving} style={btnPrimary}>{accountSaving ? 'Saving...' : 'Save'}</button>
          {accountMsg && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: accountMsg === 'Saved.' ? '#6EAB7E' : '#E07070' }}>{accountMsg}</span>}
        </div>
      </div>

      {/* Password */}
      <div style={section}>
        <div style={sectionTitle}>Change Password</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={lbl}>Current Password</label>
            <input type="password" style={inp} value={pwForm.currentPassword} onChange={e => setPwForm(p => ({ ...p, currentPassword: e.target.value }))}
              onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={lbl}>New Password</label>
              <input type="password" style={inp} value={pwForm.newPassword} onChange={e => setPwForm(p => ({ ...p, newPassword: e.target.value }))}
                onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
            <div>
              <label style={lbl}>Confirm New Password</label>
              <input type="password" style={inp} value={pwForm.confirmPassword} onChange={e => setPwForm(p => ({ ...p, confirmPassword: e.target.value }))}
                onFocus={e => (e.target.style.borderColor = '#C8923C')} onBlur={e => (e.target.style.borderColor = '#1E1A17')} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={savePassword} disabled={pwSaving} style={btnPrimary}>{pwSaving ? 'Updating...' : 'Update Password'}</button>
          {pwMsg && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: pwMsg === 'Password updated.' ? '#6EAB7E' : '#E07070' }}>{pwMsg}</span>}
        </div>
      </div>

      {/* Team Invites */}
      {(data?.user.role === 'owner' || data?.user.role === 'manager') && (
        <div style={section}>
          <div style={sectionTitle}>Team Invites</div>
          <p style={{ fontSize: 13, color: '#C4B8AA', lineHeight: 1.7, marginBottom: 20 }}>
            Generate invite codes to let team members join your organization. Codes expire after 7 days.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <select
              style={{ background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, padding: '9px 12px', color: 'white', fontSize: 13, outline: 'none', cursor: 'pointer' }}
              value={inviteRole}
              onChange={e => setInviteRole(e.target.value)}
            >
              <option value="member" style={{ background: '#1A1614' }}>Member</option>
              <option value="manager" style={{ background: '#1A1614' }}>Manager</option>
            </select>
            <button onClick={generateInvite} disabled={inviteLoading} style={btnPrimary}>
              {inviteLoading ? 'Generating...' : 'Generate Invite'}
            </button>
          </div>

          {newCode && (
            <div style={{ background: '#0E0C0A', border: '1px solid rgba(200,146,60,0.4)', borderRadius: 4, padding: '16px 20px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>New invite code (share this)</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 20, color: '#C8923C', letterSpacing: '0.3em', fontWeight: 700 }}>{newCode}</div>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(newCode)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: '1px solid #1E1A17', borderRadius: 3, padding: '6px 12px', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Copy
              </button>
            </div>
          )}

          {invites.filter(i => !i.usedBy && i.expiresAt > Date.now()).length > 0 && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>Active invites</div>
              {invites.filter(i => !i.usedBy && i.expiresAt > Date.now()).map(invite => (
                <div key={invite.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0E0C0A', border: '1px solid #1E1A17', borderRadius: 3, marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#C4B8AA', letterSpacing: '0.2em' }}>{invite.code}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{invite.role}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440' }}>
                      expires {new Date(invite.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <button onClick={() => revokeInvite(invite.id)} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', background: 'none', border: 'none', cursor: 'pointer' }}>Revoke</button>
                </div>
              ))}
            </div>
          )}

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#4A4440', letterSpacing: '0.1em', marginTop: 12 }}>
            Share the join link: <span style={{ color: '#6B5E52' }}>/join</span>
          </div>
        </div>
      )}

      {/* Danger zone */}
      <div style={{ ...section, borderColor: 'rgba(200,64,64,0.2)', background: 'rgba(200,64,64,0.04)' }}>
        <div style={{ ...sectionTitle, color: '#E07070' }}>Danger Zone</div>
        <p style={{ fontSize: 14, color: '#C4B8AA', lineHeight: 1.7, marginBottom: 20 }}>
          Permanently delete your organization and all associated data — equipment, team, inventory, schedules, and financial records. This cannot be undone.
        </p>
        <div style={{ marginBottom: 12 }}>
          <label style={{ ...lbl, color: '#E07070' }}>Type DELETE to confirm</label>
          <input
            style={{ ...inp, borderColor: deleteConfirm === 'DELETE' ? 'rgba(200,64,64,0.6)' : '#1E1A17', maxWidth: 220 }}
            value={deleteConfirm}
            onChange={e => setDeleteConfirm(e.target.value)}
            placeholder="DELETE"
          />
        </div>
        <button
          onClick={deleteAccount}
          disabled={deleting || deleteConfirm !== 'DELETE'}
          style={{
            background: deleteConfirm === 'DELETE' ? 'rgba(200,64,64,0.15)' : 'transparent',
            color: deleteConfirm === 'DELETE' ? '#E07070' : '#4A4440',
            border: `1px solid ${deleteConfirm === 'DELETE' ? 'rgba(200,64,64,0.4)' : '#1E1A17'}`,
            borderRadius: 3,
            padding: '9px 18px',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: deleteConfirm === 'DELETE' ? 'pointer' : 'not-allowed',
          }}
        >
          {deleting ? 'Deleting...' : 'Delete Organization'}
        </button>
      </div>
    </div>
  )
}
