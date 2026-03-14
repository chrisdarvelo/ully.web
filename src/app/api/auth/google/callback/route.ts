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
  const stateParam = searchParams.get('state')
  const stateCookie = req.cookies.get('oauth_state')?.value

  // Validate CSRF state parameter
  if (!stateParam || !stateCookie || stateParam !== stateCookie) {
    const res = NextResponse.redirect(new URL('/login?error=invalid_state', BASE_URL))
    res.cookies.delete('oauth_state')
    return res
  }

  if (errorParam || !code) {
    const res = NextResponse.redirect(new URL('/login?error=google_cancelled', BASE_URL))
    res.cookies.delete('oauth_state')
    return res
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    const res = NextResponse.redirect(new URL('/login?error=google_not_configured', BASE_URL))
    res.cookies.delete('oauth_state')
    return res
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
      const res = NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL))
      res.cookies.delete('oauth_state')
      return res
    }

    const { access_token } = await tokenRes.json()

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (!userRes.ok) {
      const res = NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL))
      res.cookies.delete('oauth_state')
      return res
    }

    const googleUser = await userRes.json()
    const email: string = (googleUser.email ?? '').toLowerCase().trim()
    const name: string = googleUser.name ?? ''

    if (!email) {
      const res = NextResponse.redirect(new URL('/login?error=google_no_email', BASE_URL))
      res.cookies.delete('oauth_state')
      return res
    }

    // Look up existing user
    const user = db.select().from(users).where(eq(users.email, email)).get()

    if (user) {
      if (!user.orgId) {
        const res = NextResponse.redirect(new URL('/login?error=account_error', BASE_URL))
        res.cookies.delete('oauth_state')
        return res
      }

      // Existing user with org — sign them in
      const org = db.select().from(organizations).where(eq(organizations.id, user.orgId)).get()

      const token = await signToken({
        userId: user.id,
        orgId: user.orgId,
        role: user.role,
        email: user.email,
        name: user.name,
        orgName: org?.name ?? '',
        sv: (user as unknown as { session_version?: number }).session_version ?? 1,
      })

      await setSessionCookie(token)
      const res = NextResponse.redirect(new URL('/dashboard', BASE_URL))
      res.cookies.delete('oauth_state')
      return res
    }

    // No account — send to signup with pre-filled fields
    const params = new URLSearchParams({ email, name })
    const res = NextResponse.redirect(new URL(`/signup?${params}`, BASE_URL))
    res.cookies.delete('oauth_state')
    return res
  } catch (err) {
    console.error('[google/callback]', err)
    const res = NextResponse.redirect(new URL('/login?error=google_failed', BASE_URL))
    res.cookies.delete('oauth_state')
    return res
  }
}
