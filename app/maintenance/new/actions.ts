'use server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const MaintenanceTicketSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
})

export async function createMaintenanceTicket(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  const validatedFields = MaintenanceTicketSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields'
    }
  }

  try {
    await prisma.maintenance.create({
      data: {
        ...validatedFields.data,
        status: 'OPEN'
      }
    })
    revalidatePath('/maintenance')
    return { error: '' }
  } catch (e) {
    return {
      error: 'Failed to create ticket'
    }
  }
}
