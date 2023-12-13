import { PrismaClient } from '@prisma/client'
import { StandartRow } from '../degiroCsvParser'

const prisma = new PrismaClient()

export const removeAllDegiroAccountRows = async (
  standardisedDegiroRows: StandartRow[]
) => {
  try {
    const data = await prisma.accountRow.deleteMany({
      where: {
        account: {
          name: 'Bitstamp'
        }
      }
    })
    console.log('🚀 ~ file: removeAllDegiroAccountRows.ts:36 ~ data:', data)

    return data
  } catch (error) {
    console.log(
      '🚀 ~ file: removeAllDegiroAccountRows.ts:10 ~ removeAllDegiroAccountRows ~ error:',
      error
    )
  }
}
