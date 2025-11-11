import '../styles/globals.css'
import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import SessionProvider from '@/components/SessionProvider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

export const metadata = {
  title: 'Villa Ops Dashboard',
  description: 'MVP for villa operations'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <main className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto p-4">
              <header className="py-4 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Villa Ops Dashboard</h1>
                <nav className="flex items-center space-x-4">
                  <Link href="/" className="nav-link">Dashboard</Link>
                  <Link href="/rooms" className="nav-link">Rooms</Link>
                  <Link href="/inventory" className="nav-link">Inventory</Link>
                  <Link href="/maintenance" className="nav-link">Maintenance</Link>
                </nav>
                {session?.user && <SignOutButton />}
              </header>
              {children}
            </div>
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
