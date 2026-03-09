import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import ChatInterface from '@/components/ChatInterface'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ully AI' }

export default async function ChatPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ChatInterface orgName={session.orgName} userName={session.name} />
    </div>
  )
}
