import React from 'react'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'

export default async function InventoryPage() {
  const items = await prisma.inventoryItem.findMany({
    take: 200,
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>
        <Button asChild>
          <Link href="/inventory/new">Add Item</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map(i => (
            <TableRow key={i.id}>
              <TableCell className="font-medium">{i.name}</TableCell>
              <TableCell>{i.category}</TableCell>
              <TableCell>{i.location}</TableCell>
              <TableCell className="text-right">{i.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
