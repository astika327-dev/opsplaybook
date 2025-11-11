import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../lib/auth'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@example.com' }
  })

  if (!user) {
    const hashedPassword = await hashPassword('password')
    await prisma.user.create({
      data: {
        email: 'admin@example.com',
        hashedPassword: hashedPassword,
        name: 'Admin',
        role: 'OWNER'
      }
    })
  }

  // Create sample rooms
  await prisma.room.createMany({
    data: [
      { name: 'Ocean Suite', number: '101', status: 'AVAILABLE' },
      { name: 'Garden Villa', number: '102', status: 'NEEDS_CLEANING' },
      { name: 'Pool Bungalow', number: '103', status: 'OCCUPIED' }
    ],
    skipDuplicates: true
  })

  // Create sample inventory items
  await prisma.inventoryItem.createMany({
    data: [
      { name: 'Towel - White', category: 'LINEN', quantity: 40, location: 'Store Room' },
      { name: 'Toothbrush Kit', category: 'TOILETRIES', quantity: 20, location: 'Store Room' }
    ],
    skipDuplicates: true
  })

  console.log('Seeded sample data')
}

main().catch(e => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
