'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'

export default function CleaningForm({ roomId }: { roomId: string }) {
  const [items, setItems] = useState({ bedMade: true, towelsReplaced: true, minibarChecked: true })
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, items, notes })
      })
      if (res.ok) {
        alert('Checklist submitted')
        setNotes('')
      } else {
        alert('Submission failed')
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <h4 className="font-semibold mb-4">Cleaning Checklist</h4>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="bedMade" checked={items.bedMade} onCheckedChange={(checked) => setItems(s => ({...s, bedMade: !!checked}))} />
          <Label htmlFor="bedMade">Bed made</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="towelsReplaced" checked={items.towelsReplaced} onCheckedChange={(checked) => setItems(s => ({...s, towelsReplaced: !!checked}))} />
          <Label htmlFor="towelsReplaced">Towels replaced</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="minibarChecked" checked={items.minibarChecked} onCheckedChange={(checked) => setItems(s => ({...s, minibarChecked: !!checked}))} />
          <Label htmlFor="minibarChecked">Minibar checked</Label>
        </div>
      </div>
      <Textarea value={notes} onChange={e => setNotes(e.target.value)} className="mt-4" placeholder="Notes (optional)" />
      <Button type="submit" disabled={isSubmitting} className="mt-4">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}
