import React from 'react'
import { prisma } from '@/lib/prisma'
import CleaningForm from '@/components/cleaning-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface Props { params: { id: string } }

export default async function RoomDetail({ params }: Props) {
  const room = await prisma.room.findUnique({
    where: { id: params.id },
    include: {
      cleaningChecklists: {
        orderBy: {
          createdAt: 'desc'
        },
        take: 5
      }
    }
  })

  if (!room) return <div>Room not found</div>

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
    <section className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{room.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Number: {room.number}</p>
            <div className="flex items-center mt-2">
              <p>Status:</p>
              <Badge className={`ml-2 ${statusColor(room.status)}`}>{room.status}</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <CleaningForm roomId={room.id} />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Cleaning History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {room.cleaningChecklists.map(checklist => (
                  <TableRow key={checklist.id}>
                    <TableCell>{new Date(checklist.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{checklist.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
