import type { NextConfig } from 'next'

const config: NextConfig = {
  serverExternalPackages: ['better-sqlite3', 'exceljs', 'pdf-lib', 'docx', 'canvas', 'mammoth'],
}

export default config
