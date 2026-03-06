import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import Sidebar from '@/components/Sidebar'

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0E0C0A' }}>
      <Sidebar
        orgName={session.orgName}
        orgId={session.orgId}
        userName={session.name}
        role={session.role}
      />
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </main>
    </div>
  )
}
