import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import path from 'path'
import fs from 'fs'

const globalForDb = globalThis as unknown as {
  _ullyDb: ReturnType<typeof drizzle> | undefined
}

function createDb() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const sqlite = new Database(path.join(dataDir, 'ully.db'))
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('foreign_keys = ON')

  const db = drizzle(sqlite, { schema })

  // Initialize tables on first connection
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS organizations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      address TEXT,
      phone TEXT,
      email TEXT,
      timezone TEXT DEFAULT 'America/New_York',
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      org_id TEXT REFERENCES organizations(id),
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'owner',
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS equipment (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      brand TEXT,
      model TEXT,
      serial TEXT,
      status TEXT NOT NULL DEFAULT 'active',
      purchase_date INTEGER,
      last_service INTEGER,
      notes TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS service_records (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      equipment_id TEXT NOT NULL REFERENCES equipment(id),
      date INTEGER NOT NULL,
      type TEXT NOT NULL,
      description TEXT,
      technician TEXT,
      cost REAL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      hourly_rate REAL,
      start_date INTEGER,
      status TEXT NOT NULL DEFAULT 'active',
      notes TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS schedules (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      member_id TEXT NOT NULL REFERENCES team_members(id),
      date INTEGER NOT NULL,
      shift_start TEXT NOT NULL,
      shift_end TEXT NOT NULL,
      position TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      quantity REAL NOT NULL DEFAULT 0,
      unit TEXT NOT NULL,
      par_level REAL,
      cost_per_unit REAL,
      supplier TEXT,
      sku TEXT,
      updated_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS revenue_records (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      date INTEGER NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      payment_method TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS expense_records (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      date INTEGER NOT NULL,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      vendor TEXT,
      description TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS invites (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      code TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL DEFAULT 'member',
      created_by TEXT NOT NULL REFERENCES users(id),
      used_by TEXT REFERENCES users(id),
      used_at INTEGER,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS training_logs (
      id TEXT PRIMARY KEY,
      org_id TEXT NOT NULL REFERENCES organizations(id),
      member_id TEXT NOT NULL REFERENCES team_members(id),
      member_name TEXT NOT NULL,
      date INTEGER NOT NULL,
      topic TEXT NOT NULL,
      description TEXT,
      score INTEGER,
      trainer TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL
    );
  `)

  // Stripe billing columns migration (safe — ignored if column already exists)
  const addCol = (col: string) => {
    try { sqlite.exec(col) } catch { /* column already exists */ }
  }
  addCol(`ALTER TABLE organizations ADD COLUMN stripe_customer_id TEXT`)
  addCol(`ALTER TABLE organizations ADD COLUMN stripe_subscription_id TEXT`)
  addCol(`ALTER TABLE organizations ADD COLUMN plan TEXT DEFAULT 'trial'`)
  addCol(`ALTER TABLE organizations ADD COLUMN plan_status TEXT DEFAULT 'trialing'`)
  addCol(`ALTER TABLE organizations ADD COLUMN trial_ends_at INTEGER`)

  return db
}

let _lazyDb: ReturnType<typeof drizzle> | undefined

function getDb(): ReturnType<typeof drizzle> {
  if (!_lazyDb) {
    _lazyDb = globalForDb._ullyDb ?? createDb()
    if (process.env.NODE_ENV !== 'production') {
      globalForDb._ullyDb = _lazyDb
    }
  }
  return _lazyDb
}

// Lazy proxy: safe to import at module level — createDb() only runs on first db access
export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, prop: string) {
    return (getDb() as unknown as Record<string, unknown>)[prop]
  },
})
