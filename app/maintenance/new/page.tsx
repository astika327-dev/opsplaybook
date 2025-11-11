'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from 'react-dom'
import { createMaintenanceTicket } from './actions'

export default function NewMaintenanceTicket() {
  const [state, formAction] = useFormState(createMaintenanceTicket, { error: '' })

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">New Maintenance Ticket</h2>
      <form action={formAction} className="max-w-md space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" required />
        </div>
        {state.error && <p className="text-red-500">{state.error}</p>}
        <Button type="submit">Create Ticket</Button>
      </form>
    </section>
  )
}
