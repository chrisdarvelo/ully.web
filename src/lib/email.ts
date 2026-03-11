import { Resend } from 'resend'

export interface EmailPayload {
  to: string
  subject: string
  body: string
  isHtml?: boolean
  replyTo?: string
}

export interface EmailResult {
  sent: boolean
  to: string
  subject: string
  error?: string
}

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not configured. Add it to .env.local to enable email sending.')
  return new Resend(key)
}

function getFromAddress(): string {
  return process.env.EMAIL_FROM ?? 'Ully Business <noreply@ullyapp.com>'
}

export async function sendEmail(payload: EmailPayload): Promise<EmailResult> {
  const resend = getResend()

  const { data, error } = await resend.emails.send({
    from: getFromAddress(),
    to: payload.to,
    subject: payload.subject,
    ...(payload.isHtml ? { html: payload.body } : { text: payload.body }),
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  })

  if (error || !data) {
    throw new Error(error?.message ?? 'Email send failed')
  }

  return {
    sent: true,
    to: payload.to,
    subject: payload.subject,
  }
}

export function formatEmailBody(text: string, orgName: string): string {
  return `${text}

---
Sent via Ully Business Platform
${orgName} · ullyapp.com`
}
