import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  equipment,
  teamMembers,
  inventory,
  revenueRecords,
  expenseRecords,
} from '@/lib/schema'
import { eq, and, gte, lte, sum, count, sql } from 'drizzle-orm'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Dashboard' }

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function startOfMonth() {
  const d = new Date()
  d.setDate(1)
  d.setHours(0, 0, 0, 0)
  return d.getTime()
}

function formatCurrency(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const orgId = session.orgId
  const todayStart = startOfToday()
  const monthStart = startOfMonth()

  // Today's revenue
  const todayRevResult = db
    .select({ total: sum(revenueRecords.amount) })
    .from(revenueRecords)
    .where(and(eq(revenueRecords.orgId, orgId), gte(revenueRecords.date, todayStart)))
    .get()
  const todayRevenue = Number(todayRevResult?.total ?? 0)

  // Month revenue + expenses
  const monthRevResult = db
    .select({ total: sum(revenueRecords.amount) })
    .from(revenueRecords)
    .where(and(eq(revenueRecords.orgId, orgId), gte(revenueRecords.date, monthStart)))
    .get()
  const monthRevenue = Number(monthRevResult?.total ?? 0)

  const monthExpResult = db
    .select({ total: sum(expenseRecords.amount) })
    .from(expenseRecords)
    .where(and(eq(expenseRecords.orgId, orgId), gte(expenseRecords.date, monthStart)))
    .get()
  const monthExpenses = Number(monthExpResult?.total ?? 0)
  const monthProfit = monthRevenue - monthExpenses

  // Equipment counts by status
  const equipmentCounts = db
    .select({ status: equipment.status, cnt: count() })
    .from(equipment)
    .where(eq(equipment.orgId, orgId))
    .groupBy(equipment.status)
    .all()

  const totalEquipment = equipmentCounts.reduce((a, r) => a + r.cnt, 0)
  const maintenanceCount = equipmentCounts.find(r => r.status === 'maintenance')?.cnt ?? 0

  // Active team count
  const teamResult = db
    .select({ cnt: count() })
    .from(teamMembers)
    .where(and(eq(teamMembers.orgId, orgId), eq(teamMembers.status, 'active')))
    .get()
  const teamCount = teamResult?.cnt ?? 0

  // Low inventory items
  const lowItems = db
    .select()
    .from(inventory)
    .where(
      and(
        eq(inventory.orgId, orgId),
        sql`${inventory.parLevel} IS NOT NULL AND ${inventory.quantity} <= ${inventory.parLevel}`
      )
    )
    .all()

  // Recent revenue (last 5)
  const recentRevenue = db
    .select()
    .from(revenueRecords)
    .where(eq(revenueRecords.orgId, orgId))
    .orderBy(sql`${revenueRecords.date} DESC`)
    .limit(5)
    .all()

  // Recent expenses (last 5)
  const recentExpenses = db
    .select()
    .from(expenseRecords)
    .where(eq(expenseRecords.orgId, orgId))
    .orderBy(sql`${expenseRecords.date} DESC`)
    .limit(5)
    .all()

  const metrics = [
    { label: "Today's Revenue", value: formatCurrency(todayRevenue), sub: 'recorded today', color: '#C8923C' },
    { label: 'Month Revenue', value: formatCurrency(monthRevenue), sub: `${formatCurrency(monthProfit)} profit`, color: monthProfit >= 0 ? '#4A8C5C' : '#C84040' },
    { label: 'Team', value: String(teamCount), sub: 'active members', color: '#C4B8AA' },
    { label: 'Equipment', value: String(totalEquipment), sub: maintenanceCount > 0 ? `${maintenanceCount} need attention` : 'all operational', color: maintenanceCount > 0 ? '#C89040' : '#4A8C5C' },
    { label: 'Low Stock', value: String(lowItems.length), sub: lowItems.length > 0 ? 'items below par' : 'inventory OK', color: lowItems.length > 0 ? '#C84040' : '#4A8C5C' },
  ]

  return (
    <div style={{ padding: 40, maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 8 }}>
          Business Overview
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>
          {session.orgName}
        </h1>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.1em', marginTop: 4 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12, marginBottom: 40 }}>
        {metrics.map(m => (
          <div key={m.label} style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '20px 20px 16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4A4440', marginBottom: 12 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: m.color, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>
              {m.value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.08em' }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowItems.length > 0 && (
        <div style={{ background: 'rgba(200,64,64,0.08)', border: '1px solid rgba(200,64,64,0.2)', borderRadius: 4, padding: '16px 20px', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#E07070', marginBottom: 8 }}>
            Low Stock Alert
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {lowItems.map(item => (
              <span key={item.id} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C4B8AA', background: 'rgba(200,64,64,0.1)', border: '1px solid rgba(200,64,64,0.2)', borderRadius: 2, padding: '3px 8px' }}>
                {item.name} — {item.quantity} {item.unit} (par: {item.parLevel})
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent Revenue */}
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E1A17', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA' }}>Recent Revenue</span>
            <Link href="/revenue" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#C8923C', letterSpacing: '0.1em' }}>View all →</Link>
          </div>
          {recentRevenue.length === 0 ? (
            <div style={{ padding: '24px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.08em' }}>
              No revenue recorded yet
            </div>
          ) : (
            recentRevenue.map(r => (
              <div key={r.id} style={{ padding: '12px 20px', borderBottom: '1px solid #1E1A17', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#C4B8AA', marginBottom: 2 }}>{r.category}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.08em' }}>{formatDate(r.date)}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#4A8C5C', fontWeight: 700 }}>
                  +{formatCurrency(r.amount)}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Recent Expenses */}
        <div style={{ background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1E1A17', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C4B8AA' }}>Recent Expenses</span>
            <Link href="/revenue" style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: '#C8923C', letterSpacing: '0.1em' }}>View all →</Link>
          </div>
          {recentExpenses.length === 0 ? (
            <div style={{ padding: '24px 20px', fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4A4440', letterSpacing: '0.08em' }}>
              No expenses recorded yet
            </div>
          ) : (
            recentExpenses.map(r => (
              <div key={r.id} style={{ padding: '12px 20px', borderBottom: '1px solid #1E1A17', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13, color: '#C4B8AA', marginBottom: 2 }}>{r.category}{r.vendor ? ` — ${r.vendor}` : ''}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4A4440', letterSpacing: '0.08em' }}>{formatDate(r.date)}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#C84040', fontWeight: 700 }}>
                  -{formatCurrency(r.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick links */}
      {(teamCount === 0 || totalEquipment === 0) && (
        <div style={{ marginTop: 32, background: '#1A1614', border: '1px solid #1E1A17', borderRadius: 4, padding: '20px 24px' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8923C', marginBottom: 16 }}>
            Get started
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {totalEquipment === 0 && (
              <Link href="/equipment" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid #1E1A17', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C4B8AA', letterSpacing: '0.1em', textDecoration: 'none' }}>
                + Add equipment
              </Link>
            )}
            {teamCount === 0 && (
              <Link href="/team" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid #1E1A17', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C4B8AA', letterSpacing: '0.1em', textDecoration: 'none' }}>
                + Add team members
              </Link>
            )}
            <Link href="/inventory" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid #1E1A17', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C4B8AA', letterSpacing: '0.1em', textDecoration: 'none' }}>
              + Set up inventory
            </Link>
            <Link href="/chat" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', border: '1px solid rgba(200,146,60,0.3)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontSize: 10, color: '#C8923C', letterSpacing: '0.1em', textDecoration: 'none' }}>
              Ask Ully AI →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
