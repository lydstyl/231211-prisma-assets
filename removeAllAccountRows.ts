import { PrismaClient } from '@prisma/client'
import { StandartRow } from './degiroCsvParser'

export const removeAllAccountRows = async (
  account: string,
  standardisedRows: StandartRow[]
) => {
  const prisma = new PrismaClient()
  try {
    const data = await prisma.accountRow.deleteMany({
      where: {
        account: {
          name: account
        }
      }
    })
    await prisma.$disconnect()
    console.log('🚀 ~ file: removeAllAccountRows.ts:18 ~ data:', data)
    return data
  } catch (error) {
    console.log('🚀 ~ file: removeAllAccountRows.ts:22 ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default removeAllAccountRows
