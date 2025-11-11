import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Room Statuses */}
        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
            <CardDescription>Overview of room cleaning and availability.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for room status chart or list */}
            <div className="flex justify-between items-center">
              <span>Ready</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>In Progress</span>
              <span className="font-bold">3</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Not Ready</span>
              <span className="font-bold">1</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/rooms">View Details</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Inventory Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Levels</CardTitle>
            <CardDescription>Linen and amenity stock overview.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for inventory levels */}
            <div className="flex justify-between items-center">
              <span>Linens</span>
              <span className="font-bold text-green-600">Sufficient</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Toiletries</span>
              <span className="font-bold text-yellow-600">Low</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/inventory">Manage Inventory</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Maintenance Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance</CardTitle>
            <CardDescription>Open and recently closed tickets.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for maintenance requests */}
            <div className="flex justify-between items-center">
              <span>Open Tickets</span>
              <span className="font-bold">2</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Closed (24h)</span>
              <span className="font-bold">1</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/maintenance">View Tickets</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
