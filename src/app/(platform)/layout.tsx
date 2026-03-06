import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import PlatformShell from '@/components/PlatformShell'

export default async function PlatformLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <PlatformShell
      orgName={session.orgName}
      orgId={session.orgId}
      userName={session.name}
      role={session.role}
    >
      {children}
    </PlatformShell>
  )
}
