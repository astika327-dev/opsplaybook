'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewInventoryItemPage() {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('')
    const [quantity, setQuantity] = useState('0')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inventory-items/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, category, location, quantity: parseInt(quantity) }),
        })

        router.push('/inventory')
    }

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Add New Inventory Item</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="mb-4">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <Button type="submit">Add Item</Button>
            </form>
        </section>
    )
}
