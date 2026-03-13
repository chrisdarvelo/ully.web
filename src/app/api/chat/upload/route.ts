export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import ExcelJS from 'exceljs'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mammoth = require('mammoth')

const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

const MAGIC_BYTES: Record<string, number[]> = {
  xlsx: [0x50, 0x4B, 0x03, 0x04], // ZIP (used by xlsx and docx)
  xls:  [0xD0, 0xCF, 0x11, 0xE0], // OLE2
}

function validateMagicBytes(buffer: Buffer, ext: string): boolean {
  if (ext === 'xlsx' || ext === 'docx') {
    const sig = MAGIC_BYTES.xlsx
    return sig.every((b, i) => buffer[i] === b)
  }
  if (ext === 'xls') {
    const sig = MAGIC_BYTES.xls
    return sig.every((b, i) => buffer[i] === b)
  }
  return true // csv/txt are plaintext — no magic bytes needed
}

function parseCSV(text: string): string {
  // Scan for newlines manually to avoid allocating a full lines array for large files
  let lineCount = 0
  let lastIdx = 0
  const parts: string[] = []
  for (let i = 0; i <= text.length; i++) {
    if (i === text.length || text[i] === '\n') {
      const line = text.slice(lastIdx, i).trim()
      if (line) {
        if (lineCount < 500) parts.push(line)
        lineCount++
      }
      lastIdx = i + 1
    }
  }
  if (parts.length === 0) return '(empty file)'
  const suffix = lineCount > 500 ? `\n... (${lineCount - 500} more rows truncated)` : ''
  return parts.join('\n') + suffix
}

async function parseXLSX(buffer: Buffer<ArrayBufferLike>): Promise<string> {
  const workbook = new ExcelJS.Workbook()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await workbook.xlsx.load(buffer as any)

  const parts: string[] = []

  workbook.eachSheet(sheet => {
    parts.push(`=== Sheet: ${sheet.name} ===`)
    const rows: string[] = []
    sheet.eachRow({ includeEmpty: false }, row => {
      const cells = (row.values as (string | number | null | undefined)[])
        .slice(1) // exceljs row.values is 1-indexed with undefined at [0]
        .map(v => {
          if (v === null || v === undefined) return ''
          if (typeof v === 'object' && 'result' in v) return String((v as { result: unknown }).result ?? '')
          return String(v)
        })
      rows.push(cells.join('\t'))
    })
    // Cap at 500 rows per sheet
    const capped = rows.slice(0, 500)
    if (rows.length > 500) capped.push(`... (${rows.length - 500} more rows truncated)`)
    parts.push(capped.join('\n'))
  })

  return parts.join('\n\n') || '(empty workbook)'
}

async function parseDOCX(buffer: Buffer<ArrayBufferLike>): Promise<string> {
  const result = await mammoth.extractRawText({ buffer })
  const text = result.value?.trim()
  if (!text) return '(empty document)'
  // Cap at ~8000 chars to stay within context
  if (text.length > 8000) return text.slice(0, 8000) + '\n... (document truncated)'
  return text
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    if (file.size > MAX_BYTES) return NextResponse.json({ error: 'File too large (max 10 MB)' }, { status: 413 })

    const name = file.name.toLowerCase()
    const ext = name.split('.').pop() ?? ''
    const buffer = Buffer.from(await file.arrayBuffer())

    if (['xlsx', 'xls', 'docx'].includes(ext) && !validateMagicBytes(buffer, ext)) {
      return NextResponse.json({ error: 'File content does not match its extension' }, { status: 400 })
    }

    let content = ''
    let fileType = ''

    if (name.endsWith('.csv') || name.endsWith('.txt')) {
      content = parseCSV(buffer.toString('utf-8'))
      fileType = name.endsWith('.csv') ? 'CSV spreadsheet' : 'text file'
    } else if (name.endsWith('.xlsx') || name.endsWith('.xls')) {
      content = await parseXLSX(buffer)
      fileType = 'Excel spreadsheet'
    } else if (name.endsWith('.docx')) {
      content = await parseDOCX(buffer)
      fileType = 'Word document'
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Supported: .csv, .txt, .xlsx, .xls, .docx' }, { status: 400 })
    }

    return NextResponse.json({
      filename: file.name,
      fileType,
      content,
    })
  } catch (err) {
    console.error('[upload]', err)
    return NextResponse.json({ error: 'Failed to parse file' }, { status: 500 })
  }
}
