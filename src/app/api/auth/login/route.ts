import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { users, organizations } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { signToken, setSessionCookie } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    const user = db.select().from(users).where(eq(users.email, email.toLowerCase().trim())).get()

    if (!user) {
      // Constant-time failure
      await bcrypt.compare(password, '$2b$12$invalidhashpaddingtoconstanttime')
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const org = db.select().from(organizations).where(eq(organizations.id, user.orgId!)).get()

    const token = await signToken({
      userId: user.id,
      orgId: user.orgId!,
      role: user.role,
      email: user.email,
      name: user.name,
      orgName: org?.name ?? '',
    })

    await setSessionCookie(token)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[login]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
