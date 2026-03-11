export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users, organizations } from '@/lib/schema'
import { eq } from 'drizzle-orm'
import { signToken, setSessionCookie } from '@/lib/auth'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL!

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')

  if (errorParam || !code) {
    return NextResponse.redirect(new URL('/login?error=google_cancelled', BASE_URL))
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/login?error=google_not_configured', BASE_URL))
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: `${BASE_URL}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL))
    }

    const { access_token } = await tokenRes.json()

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!userRes.ok) {
      return NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL))
    }

    const googleUser = await userRes.json()
    const email: string = (googleUser.email ?? '').toLowerCase().trim()
    const name: string = googleUser.name ?? ''

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=google_no_email', BASE_URL))
    }

    // Look up existing user
    const user = db.select().from(users).where(eq(users.email, email)).get()

    if (user && user.orgId) {
      // Existing user with org — sign them in
      const org = db.select().from(organizations).where(eq(organizations.id, user.orgId)).get()

      const token = await signToken({
        userId: user.id,
        orgId: user.orgId,
        role: user.role,
        email: user.email,
        name: user.name,
        orgName: org?.name ?? '',
      })

      await setSessionCookie(token)
      return NextResponse.redirect(new URL('/dashboard', BASE_URL))
    }

    // No account — send to signup with pre-filled fields
    const params = new URLSearchParams({ email, name })
    return NextResponse.redirect(new URL(`/signup?${params}`, BASE_URL))
  } catch (err) {
    console.error('[google/callback]', err)
    return NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL))
  }
}
