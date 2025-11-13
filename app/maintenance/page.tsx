import React from 'react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

async function getMaintenanceTickets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/maintenance/`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function MaintenancePage() {
  const tickets = await getMaintenanceTickets()

  const statusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-600'
      case 'IN_PROGRESS':
        return 'bg-yellow-600'
      case 'RESOLVED':
        return 'bg-blue-600'
      case 'CLOSED':
        return 'bg-green-600'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Maintenance</h2>
        <Button asChild>
          <Link href="/maintenance/new">New Ticket</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map(t => (
            <TableRow key={t.id}>
              <TableCell className="font-medium">{t.title}</TableCell>
              <TableCell>{t.description}</TableCell>
              <TableCell>
                <Badge className={statusColor(t.status)}>{t.status}</Badge>
              </TableCell>
              <TableCell>{new Date(t.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
