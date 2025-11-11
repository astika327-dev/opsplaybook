'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormState } from 'react-dom'
import { saveInventoryItem } from './actions'

export default function NewInventoryItem() {
  const [state, formAction] = useFormState(saveInventoryItem, { error: '' })

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Add Inventory Item</h2>
      <form action={formAction} className="max-w-md space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select name="category" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LINEN">Linen</SelectItem>
              <SelectItem value="TOILETRIES">Toiletries</SelectItem>
              <SelectItem value="CLEANING">Cleaning</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" required />
        </div>
        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input id="quantity" name="quantity" type="number" required />
        </div>
        {state.error && <p className="text-red-500">{state.error}</p>}
        <Button type="submit">Save</Button>
      </form>
    </section>
  )
}
