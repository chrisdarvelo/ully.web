/**
 * Ully Report Generator
 * Produces Excel, PDF, and Word documents from live org data.
 * All output is returned as base64 Buffer — no files written to disk.
 */

import ExcelJS from 'exceljs'
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from 'pdf-lib'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle } from 'docx'

// ────────────────────────────────────────────────────────────────────
// Shared types
// ────────────────────────────────────────────────────────────────────

export interface GeneratedFile {
  name: string
  base64: string
  mime: string
}

// Brand colors
const GOLD = { argb: 'FFC8923C' }
const DARK = { argb: 'FF0E0C0A' }
const CARD = { argb: 'FF1A1614' }
const TEXT = { argb: 'FFC4B8AA' }
const MUTED = { argb: 'FF4A4440' }
const GREEN = { argb: 'FF4A8C5C' }
const RED = { argb: 'FFC84040' }

// ────────────────────────────────────────────────────────────────────
// Excel helpers
// ────────────────────────────────────────────────────────────────────

function xlsxHeader(sheet: ExcelJS.Worksheet, title: string) {
  sheet.mergeCells('A1:G1')
  const titleRow = sheet.getRow(1)
  titleRow.getCell(1).value = title
  titleRow.getCell(1).font = { bold: true, size: 14, color: GOLD }
  titleRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1614' } }
  titleRow.height = 24

  sheet.mergeCells('A2:G2')
  const dateRow = sheet.getRow(2)
  dateRow.getCell(1).value = `Generated: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`
  dateRow.getCell(1).font = { size: 10, color: MUTED }
  dateRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1614' } }

  sheet.addRow([])
}

function xlsxHeaderRow(sheet: ExcelJS.Worksheet, columns: string[]) {
  const row = sheet.addRow(columns)
  row.eachCell(cell => {
    cell.font = { bold: true, size: 10, color: DARK }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: GOLD }
    cell.alignment = { vertical: 'middle' }
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FF0E0C0A' } },
    }
  })
  row.height = 18
  return row
}

function xlsxDataRow(sheet: ExcelJS.Worksheet, values: (string | number | null)[], alt: boolean) {
  const row = sheet.addRow(values)
  row.eachCell({ includeEmpty: true }, cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: alt ? 'FF141210' : 'FF0E0C0A' } }
    cell.font = { size: 10, color: TEXT }
  })
  return row
}

// ────────────────────────────────────────────────────────────────────
// PDF helpers
// ────────────────────────────────────────────────────────────────────

const PDF_GOLD = rgb(0.784, 0.573, 0.235)
const PDF_WHITE = rgb(1, 1, 1)
const PDF_TEXT = rgb(0.77, 0.72, 0.67)
const PDF_MUTED = rgb(0.29, 0.27, 0.25)
const PDF_DARK = rgb(0.055, 0.047, 0.039)
const PDF_CARD = rgb(0.102, 0.086, 0.078)
const PDF_GREEN = rgb(0.29, 0.549, 0.361)
const PDF_RED = rgb(0.784, 0.251, 0.251)
const PDF_LINE = rgb(0.12, 0.102, 0.094)

interface TableOptions {
  x: number
  y: number
  colWidths: number[]
  font: PDFFont
  boldFont: PDFFont
  fontSize?: number
}

function pdfTable(page: PDFPage, rows: string[][], opts: TableOptions): number {
  const { x, y, colWidths, font, boldFont, fontSize = 9 } = opts
  const rowH = fontSize + 10
  const totalWidth = colWidths.reduce((a, b) => a + b, 0)
  let curY = y

  rows.forEach((row, ri) => {
    const isHeader = ri === 0
    const bg = isHeader ? PDF_CARD : ri % 2 === 0 ? rgb(0.07, 0.059, 0.051) : PDF_DARK

    page.drawRectangle({ x, y: curY - rowH + 2, width: totalWidth, height: rowH, color: bg })

    let curX = x
    row.forEach((cell, ci) => {
      const truncated = String(cell ?? '').slice(0, Math.floor(colWidths[ci] / 5.5))
      page.drawText(truncated, {
        x: curX + 4,
        y: curY - fontSize + 2,
        size: fontSize,
        font: isHeader ? boldFont : font,
        color: isHeader ? PDF_GOLD : PDF_TEXT,
      })
      curX += colWidths[ci]
    })

    // Row border
    page.drawLine({ start: { x, y: curY - rowH + 2 }, end: { x: x + totalWidth, y: curY - rowH + 2 }, thickness: 0.3, color: PDF_LINE })
    curY -= rowH
  })

  return curY
}

function pdfHeader(page: PDFPage, font: PDFFont, boldFont: PDFFont, orgName: string, reportTitle: string) {
  const { width } = page.getSize()
  // Header bar
  page.drawRectangle({ x: 0, y: 790, width, height: 52, color: PDF_CARD })
  page.drawText('ULLY', { x: 40, y: 815, size: 18, font: boldFont, color: PDF_GOLD })
  page.drawText(orgName.toUpperCase(), { x: 92, y: 820, size: 8, font, color: PDF_MUTED })
  page.drawText(reportTitle, { x: 92, y: 808, size: 12, font: boldFont, color: PDF_TEXT })
  page.drawText(new Date().toLocaleDateString('en-US', { dateStyle: 'long' }), { x: width - 140, y: 815, size: 8, font, color: PDF_MUTED })
  page.drawLine({ start: { x: 0, y: 790 }, end: { x: width, y: 790 }, thickness: 1, color: PDF_GOLD })
}

function pdfSection(page: PDFPage, boldFont: PDFFont, label: string, y: number) {
  page.drawText(label.toUpperCase(), { x: 40, y, size: 7, font: boldFont, color: PDF_GOLD })
  page.drawLine({ start: { x: 40, y: y - 4 }, end: { x: 555, y: y - 4 }, thickness: 0.5, color: PDF_LINE })
  return y - 16
}

function pdfMetricCard(page: PDFPage, font: PDFFont, boldFont: PDFFont, x: number, y: number, label: string, value: string, color: typeof PDF_GREEN) {
  page.drawRectangle({ x, y: y - 50, width: 115, height: 50, color: PDF_CARD })
  page.drawText(label, { x: x + 6, y: y - 12, size: 7, font, color: PDF_MUTED })
  page.drawText(value, { x: x + 6, y: y - 36, size: 16, font: boldFont, color })
}

// ────────────────────────────────────────────────────────────────────
// EXCEL REPORTS
// ────────────────────────────────────────────────────────────────────

export async function generateFinancialExcel(data: {
  orgName: string
  months: { label: string; rev: number; exp: number }[]
  revenue: { date: number; amount: number; category: string; description: string | null; paymentMethod: string | null }[]
  expenses: { date: number; amount: number; category: string; vendor: string | null; description: string | null }[]
}): Promise<GeneratedFile> {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Ully Business Platform'
  wb.created = new Date()

  // ── Sheet 1: P&L Summary ──
  const plSheet = wb.addWorksheet('P&L Summary')
  xlsxHeader(plSheet, `${data.orgName} — Financial Report`)
  xlsxHeaderRow(plSheet, ['Month', 'Revenue', 'Expenses', 'Net Profit', 'Margin %'])

  data.months.forEach((m, i) => {
    const profit = m.rev - m.exp
    const margin = m.rev > 0 ? ((profit / m.rev) * 100).toFixed(1) + '%' : '0%'
    const row = xlsxDataRow(plSheet, [m.label, m.rev, m.exp, profit, margin], i % 2 === 0)
    row.getCell(2).numFmt = '$#,##0.00'
    row.getCell(3).numFmt = '$#,##0.00'
    row.getCell(4).numFmt = '$#,##0.00'
    const profitCell = row.getCell(4)
    profitCell.font = { ...profitCell.font, color: profit >= 0 ? GREEN : RED, bold: true }
  })

  // Totals row
  const totalRev = data.revenue.reduce((s, r) => s + r.amount, 0)
  const totalExp = data.expenses.reduce((s, r) => s + r.amount, 0)
  const totalRow = plSheet.addRow(['TOTAL', totalRev, totalExp, totalRev - totalExp, totalRev > 0 ? (((totalRev - totalExp) / totalRev) * 100).toFixed(1) + '%' : '0%'])
  totalRow.eachCell(cell => {
    cell.font = { bold: true, color: GOLD }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1614' } }
  })
  ;[2, 3, 4].forEach(c => (totalRow.getCell(c).numFmt = '$#,##0.00'))

  plSheet.columns = [{ width: 14 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 12 }]

  // ── Sheet 2: Revenue Records ──
  const revSheet = wb.addWorksheet('Revenue')
  xlsxHeader(revSheet, 'Revenue Records')
  xlsxHeaderRow(revSheet, ['Date', 'Amount', 'Category', 'Description', 'Payment Method'])
  data.revenue.forEach((r, i) => {
    const row = xlsxDataRow(revSheet, [
      new Date(r.date).toLocaleDateString('en-US'),
      r.amount,
      r.category,
      r.description ?? '',
      r.paymentMethod ?? '',
    ], i % 2 === 0)
    row.getCell(2).numFmt = '$#,##0.00'
    row.getCell(2).font = { color: GREEN, bold: true }
  })
  revSheet.columns = [{ width: 14 }, { width: 14 }, { width: 14 }, { width: 32 }, { width: 16 }]

  // ── Sheet 3: Expense Records ──
  const expSheet = wb.addWorksheet('Expenses')
  xlsxHeader(expSheet, 'Expense Records')
  xlsxHeaderRow(expSheet, ['Date', 'Amount', 'Category', 'Vendor', 'Description'])
  data.expenses.forEach((r, i) => {
    const row = xlsxDataRow(expSheet, [
      new Date(r.date).toLocaleDateString('en-US'),
      r.amount,
      r.category,
      r.vendor ?? '',
      r.description ?? '',
    ], i % 2 === 0)
    row.getCell(2).numFmt = '$#,##0.00'
    row.getCell(2).font = { color: RED, bold: true }
  })
  expSheet.columns = [{ width: 14 }, { width: 14 }, { width: 14 }, { width: 20 }, { width: 32 }]

  const buf = await wb.xlsx.writeBuffer()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Financial-Report.xlsx`,
    base64: Buffer.from(buf).toString('base64'),
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }
}

export async function generateInventoryExcel(data: {
  orgName: string
  items: { name: string; category: string; quantity: number; unit: string; parLevel: number | null; costPerUnit: number | null; supplier: string | null; sku: string | null }[]
}): Promise<GeneratedFile> {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Ully Business Platform'

  const allSheet = wb.addWorksheet('All Inventory')
  xlsxHeader(allSheet, `${data.orgName} — Inventory Report`)
  xlsxHeaderRow(allSheet, ['Item', 'Category', 'Quantity', 'Unit', 'Par Level', 'Status', 'Cost/Unit', 'Total Value', 'Supplier', 'SKU'])

  const lowItems: typeof data.items = []

  data.items.forEach((item, i) => {
    const isLow = item.parLevel !== null && item.quantity <= item.parLevel
    if (isLow) lowItems.push(item)
    const totalValue = item.costPerUnit ? item.quantity * item.costPerUnit : null
    const row = xlsxDataRow(allSheet, [
      item.name, item.category, item.quantity, item.unit,
      item.parLevel ?? 'Not set',
      isLow ? 'LOW STOCK' : 'OK',
      item.costPerUnit ?? '',
      totalValue ?? '',
      item.supplier ?? '',
      item.sku ?? '',
    ], i % 2 === 0)
    const statusCell = row.getCell(6)
    statusCell.font = { color: isLow ? RED : GREEN, bold: isLow }
    if (item.costPerUnit) { row.getCell(7).numFmt = '$#,##0.00'; row.getCell(8).numFmt = '$#,##0.00' }
  })

  allSheet.columns = [{ width: 24 }, { width: 14 }, { width: 12 }, { width: 8 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 14 }, { width: 20 }, { width: 16 }]

  // Reorder sheet
  if (lowItems.length > 0) {
    const reorderSheet = wb.addWorksheet('Reorder List ⚠')
    xlsxHeader(reorderSheet, 'Items Requiring Reorder')
    xlsxHeaderRow(reorderSheet, ['Item', 'Category', 'Current Stock', 'Unit', 'Par Level', 'Shortage', 'Supplier'])
    lowItems.forEach((item, i) => {
      xlsxDataRow(reorderSheet, [
        item.name, item.category, item.quantity, item.unit,
        item.parLevel ?? '', item.parLevel ? item.parLevel - item.quantity : '',
        item.supplier ?? 'Unknown',
      ], i % 2 === 0)
    })
    reorderSheet.columns = [{ width: 24 }, { width: 14 }, { width: 14 }, { width: 8 }, { width: 12 }, { width: 12 }, { width: 24 }]
  }

  const buf = await wb.xlsx.writeBuffer()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Inventory.xlsx`,
    base64: Buffer.from(buf).toString('base64'),
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }
}

export async function generateScheduleExcel(data: {
  orgName: string
  weekLabel: string
  team: { id: string; name: string; role: string; hourlyRate: number | null }[]
  shifts: { memberId: string; memberName: string; date: number; shiftStart: string; shiftEnd: string; position: string | null }[]
}): Promise<GeneratedFile> {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Ully Business Platform'

  const schedSheet = wb.addWorksheet('Schedule')
  xlsxHeader(schedSheet, `${data.orgName} — Schedule ${data.weekLabel}`)

  // Build 7-day header
  const shifts = data.shifts
  const uniqueDays = [...new Set(shifts.map(s => s.date))].sort()
  const dayLabels = uniqueDays.map(d => new Date(d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))

  xlsxHeaderRow(schedSheet, ['Team Member', 'Role', ...dayLabels, 'Total Hours'])

  function shiftHours(start: string, end: string) {
    const [sh, sm] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    return Math.max(0, (eh * 60 + em - sh * 60 - sm) / 60)
  }

  data.team.forEach((member, i) => {
    const memberShifts = shifts.filter(s => s.memberId === member.id)
    const dayValues = uniqueDays.map(day => {
      const dayShifts = memberShifts.filter(s => s.date === day)
      return dayShifts.map(s => `${s.shiftStart}–${s.shiftEnd}${s.position ? ` (${s.position})` : ''}`).join(', ') || ''
    })
    const totalHours = memberShifts.reduce((acc, s) => acc + shiftHours(s.shiftStart, s.shiftEnd), 0)
    xlsxDataRow(schedSheet, [member.name, member.role, ...dayValues, totalHours.toFixed(1) + 'h'], i % 2 === 0)
  })

  schedSheet.getColumn(1).width = 20
  schedSheet.getColumn(2).width = 16
  uniqueDays.forEach((_, i) => { schedSheet.getColumn(3 + i).width = 20 })

  // Labor cost sheet
  const laborSheet = wb.addWorksheet('Labor Cost')
  xlsxHeader(laborSheet, 'Labor Cost Analysis')
  xlsxHeaderRow(laborSheet, ['Team Member', 'Role', 'Hourly Rate', 'Total Hours', 'Est. Labor Cost'])

  let totalHours = 0, totalCost = 0
  data.team.forEach((member, i) => {
    const memberShifts = shifts.filter(s => s.memberId === member.id)
    const hours = memberShifts.reduce((acc, s) => acc + shiftHours(s.shiftStart, s.shiftEnd), 0)
    const cost = member.hourlyRate ? hours * member.hourlyRate : null
    totalHours += hours
    totalCost += cost ?? 0
    const row = xlsxDataRow(laborSheet, [member.name, member.role, member.hourlyRate ?? 'Not set', hours.toFixed(1), cost ?? 'N/A'], i % 2 === 0)
    if (member.hourlyRate) { row.getCell(3).numFmt = '$#,##0.00'; row.getCell(5).numFmt = '$#,##0.00' }
  })
  const totRow = laborSheet.addRow(['TOTAL', '', '', totalHours.toFixed(1) + 'h', totalCost])
  totRow.eachCell(c => { c.font = { bold: true, color: GOLD }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1A1614' } } })
  totRow.getCell(5).numFmt = '$#,##0.00'
  laborSheet.columns = [{ width: 20 }, { width: 16 }, { width: 14 }, { width: 14 }, { width: 16 }]

  const buf = await wb.xlsx.writeBuffer()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Schedule.xlsx`,
    base64: Buffer.from(buf).toString('base64'),
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }
}

export async function generateTeamExcel(data: {
  orgName: string
  team: { name: string; role: string; email: string | null; phone: string | null; hourlyRate: number | null; status: string }[]
}): Promise<GeneratedFile> {
  const wb = new ExcelJS.Workbook()
  const sheet = wb.addWorksheet('Team Roster')
  xlsxHeader(sheet, `${data.orgName} — Team Roster`)
  xlsxHeaderRow(sheet, ['Name', 'Role', 'Email', 'Phone', 'Hourly Rate', 'Status'])
  data.team.forEach((m, i) => {
    const row = xlsxDataRow(sheet, [m.name, m.role, m.email ?? '', m.phone ?? '', m.hourlyRate ?? '', m.status], i % 2 === 0)
    if (m.hourlyRate) row.getCell(5).numFmt = '$#,##0.00'
    row.getCell(6).font = { color: m.status === 'active' ? GREEN : MUTED, bold: m.status === 'active' }
  })
  sheet.columns = [{ width: 22 }, { width: 18 }, { width: 28 }, { width: 16 }, { width: 14 }, { width: 10 }]
  const buf = await wb.xlsx.writeBuffer()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Team.xlsx`,
    base64: Buffer.from(buf).toString('base64'),
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }
}

export async function generateTrainingExcel(data: {
  orgName: string
  logs: { memberName: string; date: number; topic: string; description: string | null; score: number | null; trainer: string | null }[]
}): Promise<GeneratedFile> {
  const wb = new ExcelJS.Workbook()
  const sheet = wb.addWorksheet('Training Logs')
  xlsxHeader(sheet, `${data.orgName} — Training Report`)
  xlsxHeaderRow(sheet, ['Date', 'Staff Member', 'Topic', 'Description', 'Score', 'Trainer'])
  data.logs.forEach((l, i) => {
    const row = xlsxDataRow(sheet, [
      new Date(l.date).toLocaleDateString('en-US'),
      l.memberName, l.topic, l.description ?? '', l.score !== null ? l.score + '/5' : '—', l.trainer ?? '',
    ], i % 2 === 0)
    if (l.score !== null) {
      row.getCell(5).font = { color: l.score >= 4 ? GREEN : l.score >= 3 ? GOLD : RED, bold: true }
    }
  })
  sheet.columns = [{ width: 14 }, { width: 20 }, { width: 20 }, { width: 36 }, { width: 10 }, { width: 18 }]
  const buf = await wb.xlsx.writeBuffer()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Training.xlsx`,
    base64: Buffer.from(buf).toString('base64'),
    mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  }
}

// ────────────────────────────────────────────────────────────────────
// PDF REPORTS
// ────────────────────────────────────────────────────────────────────

export async function generateBusinessOverviewPDF(data: {
  orgName: string
  orgType: string
  todayRevenue: number
  monthRevenue: number
  monthExpenses: number
  monthProfit: number
  teamCount: number
  totalEquipment: number
  maintenanceCount: number
  lowStockCount: number
  lowStockItems: string[]
  recentRevenue: { date: number; amount: number; category: string }[]
  recentExpenses: { date: number; amount: number; category: string; vendor: string | null }[]
  equipment: { name: string; type: string; brand: string | null; status: string; lastService: number | null }[]
}): Promise<GeneratedFile> {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const page = pdfDoc.addPage([595, 842])
  const { width } = page.getSize()

  // Header
  pdfHeader(page, font, boldFont, data.orgName, 'Business Overview Report')

  let y = 770

  // Metric cards (4 across)
  y = pdfSection(page, boldFont, 'Key Performance Indicators', y - 10)
  y -= 10

  const metrics = [
    { label: "Today's Revenue", value: '$' + data.todayRevenue.toFixed(0), color: PDF_GOLD },
    { label: 'Month Revenue', value: '$' + data.monthRevenue.toFixed(0), color: PDF_GREEN },
    { label: 'Month Profit', value: '$' + data.monthProfit.toFixed(0), color: data.monthProfit >= 0 ? PDF_GREEN : PDF_RED },
    { label: 'Profit Margin', value: data.monthRevenue > 0 ? ((data.monthProfit / data.monthRevenue) * 100).toFixed(1) + '%' : '0%', color: data.monthProfit >= 0 ? PDF_GREEN : PDF_RED },
  ]
  metrics.forEach((m, i) => pdfMetricCard(page, font, boldFont, 40 + i * 130, y, m.label, m.value, m.color))
  y -= 70

  const metrics2 = [
    { label: 'Active Team', value: String(data.teamCount), color: PDF_TEXT },
    { label: 'Equipment', value: String(data.totalEquipment), color: PDF_TEXT },
    { label: 'Need Maintenance', value: String(data.maintenanceCount), color: data.maintenanceCount > 0 ? PDF_RED : PDF_GREEN },
    { label: 'Low Stock Items', value: String(data.lowStockCount), color: data.lowStockCount > 0 ? PDF_RED : PDF_GREEN },
  ]
  metrics2.forEach((m, i) => pdfMetricCard(page, font, boldFont, 40 + i * 130, y, m.label, m.value, m.color))
  y -= 70

  // Recent Revenue
  y = pdfSection(page, boldFont, 'Recent Revenue', y)
  if (data.recentRevenue.length > 0) {
    const rows = [['Date', 'Category', 'Amount'], ...data.recentRevenue.map(r => [
      new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      r.category,
      '$' + r.amount.toFixed(2),
    ])]
    y = pdfTable(page, rows, { x: 40, y, colWidths: [100, 200, 100], font, boldFont })
  } else {
    page.drawText('No revenue records', { x: 40, y: y - 14, size: 9, font, color: PDF_MUTED })
    y -= 20
  }
  y -= 16

  // Equipment Status
  if (y > 200) {
    y = pdfSection(page, boldFont, 'Equipment Status', y)
    const eqRows = [['Equipment', 'Type', 'Brand', 'Status', 'Last Service'], ...data.equipment.slice(0, 6).map(e => [
      e.name, e.type, e.brand ?? '—', e.status,
      e.lastService ? new Date(e.lastService).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) : 'Never',
    ])]
    y = pdfTable(page, eqRows, { x: 40, y, colWidths: [130, 80, 100, 80, 90], font, boldFont })
    y -= 16
  }

  // Low stock alert
  if (data.lowStockItems.length > 0 && y > 120) {
    y = pdfSection(page, boldFont, 'Low Stock Alert', y)
    data.lowStockItems.slice(0, 6).forEach(item => {
      page.drawText('⚠ ' + item, { x: 48, y: y - 12, size: 9, font, color: PDF_RED })
      y -= 16
    })
  }

  // Footer
  page.drawLine({ start: { x: 40, y: 30 }, end: { x: width - 40, y: 30 }, thickness: 0.5, color: PDF_LINE })
  page.drawText('Generated by Ully Business Platform · ullycoffee.com', { x: 40, y: 18, size: 7, font, color: PDF_MUTED })
  page.drawText(new Date().toLocaleDateString(), { x: width - 100, y: 18, size: 7, font, color: PDF_MUTED })

  const bytes = await pdfDoc.save()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Business-Overview.pdf`,
    base64: Buffer.from(bytes).toString('base64'),
    mime: 'application/pdf',
  }
}

export async function generateEquipmentPDF(data: {
  orgName: string
  equipment: { name: string; type: string; brand: string | null; model: string | null; serial: string | null; status: string; lastService: number | null; notes: string | null }[]
  serviceRecords: { equipmentId: string; date: number; type: string; description: string | null; technician: string | null; cost: number | null }[]
  equipmentIds: Record<string, string> // id → name
}): Promise<GeneratedFile> {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const page = pdfDoc.addPage([595, 842])
  const { width } = page.getSize()
  pdfHeader(page, font, boldFont, data.orgName, 'Equipment Maintenance Report')

  let y = 760
  y = pdfSection(page, boldFont, 'Equipment Inventory', y)

  const eqRows = [
    ['Equipment', 'Type / Brand', 'Serial', 'Status', 'Last Serviced'],
    ...data.equipment.map(e => [
      e.name,
      [e.brand, e.type].filter(Boolean).join(' '),
      e.serial ?? '—',
      e.status,
      e.lastService ? new Date(e.lastService).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) : 'Never',
    ])
  ]
  y = pdfTable(page, eqRows, { x: 40, y, colWidths: [140, 120, 80, 80, 100], font, boldFont })
  y -= 20

  if (data.serviceRecords.length > 0 && y > 100) {
    y = pdfSection(page, boldFont, 'Service History (Recent)', y)
    const svcRows = [
      ['Date', 'Equipment', 'Type', 'Technician', 'Cost'],
      ...data.serviceRecords.slice(0, 10).map(r => [
        new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }),
        data.equipmentIds[r.equipmentId] ?? '—',
        r.type,
        r.technician ?? '—',
        r.cost ? '$' + r.cost.toFixed(2) : '—',
      ])
    ]
    y = pdfTable(page, svcRows, { x: 40, y, colWidths: [80, 150, 100, 120, 70], font, boldFont })
  }

  page.drawLine({ start: { x: 40, y: 30 }, end: { x: width - 40, y: 30 }, thickness: 0.5, color: PDF_LINE })
  page.drawText('Generated by Ully Business Platform · ullycoffee.com', { x: 40, y: 18, size: 7, font, color: PDF_MUTED })

  const bytes = await pdfDoc.save()
  return {
    name: `${data.orgName.replace(/\s+/g, '-')}-Equipment-Report.pdf`,
    base64: Buffer.from(bytes).toString('base64'),
    mime: 'application/pdf',
  }
}

// ────────────────────────────────────────────────────────────────────
// WORD DOCUMENTS
// ────────────────────────────────────────────────────────────────────

function wordHeading(text: string, level: typeof HeadingLevel[keyof typeof HeadingLevel]) {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 240, after: 120 },
  })
}

function wordParagraph(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { after: 120 },
  })
}

function wordTable(headers: string[], rows: string[][]) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map(h => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20 })] })],
          shading: { fill: 'C8923C' },
        })),
        tableHeader: true,
      }),
      ...rows.map((row, ri) => new TableRow({
        children: row.map(cell => new TableCell({
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })],
          shading: { fill: ri % 2 === 0 ? 'F5F1EC' : 'FFFFFF' },
          borders: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'D4C8BC' } },
        })),
      })),
    ],
  })
}

export async function generateWordDocument(data: {
  orgName: string
  documentType: string
  title: string
  content: string
}): Promise<GeneratedFile> {
  const now = new Date().toLocaleDateString('en-US', { dateStyle: 'long' })

  const sections: (Paragraph | Table)[] = [
    new Paragraph({
      children: [new TextRun({ text: 'ULLY', bold: true, size: 32, color: 'C8923C' })],
      alignment: AlignmentType.RIGHT,
    }),
    new Paragraph({
      children: [new TextRun({ text: data.orgName, size: 22, color: '6B5E52' })],
      alignment: AlignmentType.RIGHT,
      spacing: { after: 240 },
    }),
    new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'C8923C' } }, spacing: { after: 240 } }),
    wordHeading(data.title, HeadingLevel.HEADING_1),
    new Paragraph({
      children: [new TextRun({ text: `Generated: ${now}`, size: 18, color: '6B5E52', italics: true })],
      spacing: { after: 240 },
    }),
  ]

  // Parse content blocks separated by \n\n
  const blocks = data.content.split('\n\n').filter(Boolean)
  blocks.forEach(block => {
    if (block.startsWith('## ')) {
      sections.push(wordHeading(block.replace('## ', ''), HeadingLevel.HEADING_2))
    } else if (block.startsWith('### ')) {
      sections.push(wordHeading(block.replace('### ', ''), HeadingLevel.HEADING_3))
    } else if (block.startsWith('| ')) {
      // Markdown table
      const tableLines = block.split('\n').filter(l => !l.match(/^\|[-| ]+\|$/))
      if (tableLines.length >= 2) {
        const headers = tableLines[0].split('|').map(c => c.trim()).filter(Boolean)
        const rows = tableLines.slice(1).map(l => l.split('|').map(c => c.trim()).filter(Boolean))
        sections.push(wordTable(headers, rows))
        sections.push(new Paragraph({ spacing: { after: 120 } }))
      }
    } else if (block.match(/^[-*] /m)) {
      // Bullet list
      block.split('\n').forEach(line => {
        if (line.match(/^[-*] /)) {
          sections.push(new Paragraph({
            children: [new TextRun({ text: line.replace(/^[-*] /, ''), size: 22 })],
            bullet: { level: 0 },
            spacing: { after: 60 },
          }))
        }
      })
    } else {
      sections.push(wordParagraph(block))
    }
  })

  const doc = new Document({
    creator: 'Ully Business Platform',
    title: data.title,
    description: `Generated for ${data.orgName}`,
    sections: [{ children: sections }],
  })

  const buf = await Packer.toBuffer(doc)
  return {
    name: `${data.title.replace(/\s+/g, '-')}.docx`,
    base64: buf.toString('base64'),
    mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  }
}
