'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewRoomPage() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, number }),
        })

        router.push('/rooms')
    }

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="number">Number</Label>
                    <Input id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <Button type="submit">Add Room</Button>
            </form>
        </section>
    )
}
