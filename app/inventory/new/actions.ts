'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const InventoryItemSchema = z.object({
  name: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  quantity: z.coerce.number().int().min(0),
})

export async function saveInventoryItem(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  const validatedFields = InventoryItemSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields'
    }
  }

  try {
    await prisma.inventoryItem.create({
      data: validatedFields.data
    })
    revalidatePath('/inventory')
    return { error: '' }
  } catch (e) {
    return {
      error: 'Failed to save item'
    }
  }
}
