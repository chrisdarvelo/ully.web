import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import Database from 'better-sqlite3'
import path from 'path'

const COOKIE_NAME = 'ully_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not set — add it to .env.local (generate with: openssl rand -hex 32)')
  }
  return new TextEncoder().encode(secret)
}

export interface SessionPayload {
  userId: string
  orgId: string
  role: string
  email: string
  name: string
  orgName: string
  sv: number
}

function getSessionVersion(userId: string): number | null {
  try {
    const sqlite = new Database(path.join(process.cwd(), 'data', 'ully.db'))
    const row = sqlite.prepare('SELECT session_version FROM users WHERE id = ?').get(userId) as { session_version: number } | undefined
    sqlite.close()
    return row?.session_version ?? null
  } catch {
    return null
  }
}

export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .setIssuedAt()
    .sign(getSecret())
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  const payload = await verifyToken(token)
  if (!payload) return null
  const currentVersion = getSessionVersion(payload.userId)
  if (currentVersion !== null && payload.sv !== currentVersion) return null
  return payload
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
