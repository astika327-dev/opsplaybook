import React from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default async function RoomsPage() {
  const rooms = await prisma.room.findMany({
    take: 50,
    orderBy: {
      name: 'asc'
    }
  })

  const statusColor = (status: string) => {
    switch (status) {
      case 'READY':
        return 'bg-green-600'
      case 'IN_PROGRESS':
        return 'bg-yellow-600'
      case 'NOT_READY':
        return 'bg-red-600'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Rooms</h2>
        <Button asChild>
          <Link href="/rooms/new">Add Room</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map(r => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>{r.number}</TableCell>
              <TableCell>
                <Badge className={statusColor(r.status)}>{r.status}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="outline">
                  <Link href={`/rooms/${r.id}`}>Open</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
