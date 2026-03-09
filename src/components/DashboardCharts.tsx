'use client'

export interface ChartDay {
  label: string
  revenue: number
  expenses: number
}

function formatK(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`
  return `$${Math.round(n).toLocaleString()}`
}

function Sparkline({ data, color, gradientId }: { data: number[]; color: string; gradientId: string }) {
  const n = data.length
  const max = Math.max(...data, 1)

  const pts = data.map((v, i) => ({
    x: n <= 1 ? 50 : (i / (n - 1)) * 100,
    y: (1 - v / max) * 100,
  }))

  const linePts = pts.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
  const areaPath =
    `M${pts[0].x.toFixed(2)},100 ` +
    pts.map(p => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ') +
    ` L${pts[pts.length - 1].x.toFixed(2)},100 Z`

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[25, 50, 75].map(y => (
        <line
          key={y}
          x1="0" y1={y} x2="100" y2={y}
          stroke="#1E1A17"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradientId})`} />

      {/* Line */}
      <polyline
        points={linePts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Data point dots */}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x.toFixed(2)}
          cy={p.y.toFixed(2)}
          r="2"
          fill={color}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

export default function DashboardCharts({ days }: { days: ChartDay[] }) {
  const revenueData = days.map(d => d.revenue)
  const expenseData = days.map(d => d.expenses)
  const revenueMax = Math.max(...revenueData, 1)
  const expenseMax = Math.max(...expenseData, 1)
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0)
  const totalExpenses = expenseData.reduce((a, b) => a + b, 0)
  const netProfit = totalRevenue - totalExpenses

  const charts = [
    {
      id: 'revenue',
      label: 'Revenue',
      period: '7 days',
      data: revenueData,
      max: revenueMax,
      total: totalRevenue,
      color: '#C8923C',
      gradientId: 'grad-revenue',
    },
    {
      id: 'expenses',
      label: 'Expenses',
      period: '7 days',
      data: expenseData,
      max: expenseMax,
      total: totalExpenses,
      color: '#C84040',
      gradientId: 'grad-expenses',
    },
  ]

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Net profit bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1A1614',
        border: '1px solid #1E1A17',
        borderRadius: 4,
        padding: '14px 24px',
        marginBottom: 12,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B5E52' }}>
          Net — 7 days
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 20,
          fontWeight: 700,
          color: netProfit >= 0 ? '#4A8C5C' : '#C84040',
          letterSpacing: '-0.01em',
        }}>
          {netProfit >= 0 ? '+' : ''}{formatK(netProfit)}
        </span>
      </div>

      {/* Two charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {charts.map(chart => (
          <div key={chart.id} style={{
            background: '#1A1614',
            border: '1px solid #1E1A17',
            borderRadius: 4,
            padding: '20px 20px 14px',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B5E52' }}>
                {chart.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4A4440', letterSpacing: '0.1em' }}>
                {chart.period}
              </span>
            </div>

            {/* Total */}
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 26,
              fontWeight: 700,
              color: chart.color,
              letterSpacing: '-0.02em',
              marginBottom: 18,
              lineHeight: 1,
            }}>
              {formatK(chart.total)}
            </div>

            {/* Chart area with y-axis */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
              {/* Y-axis */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                color: '#4A4440',
                letterSpacing: '0.06em',
                textAlign: 'right',
                flexShrink: 0,
                width: 36,
                paddingTop: 2,
                paddingBottom: 2,
              }}>
                <span>{formatK(chart.max)}</span>
                <span>{formatK(chart.max / 2)}</span>
                <span>$0</span>
              </div>

              {/* SVG */}
              <div style={{ flex: 1, height: 90 }}>
                <Sparkline data={chart.data} color={chart.color} gradientId={chart.gradientId} />
              </div>
            </div>

            {/* X-axis labels */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingLeft: 44,
              marginTop: 8,
            }}>
              {days.map(d => (
                <span key={d.label} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  color: '#4A4440',
                  letterSpacing: '0.06em',
                }}>
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
