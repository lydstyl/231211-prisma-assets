// import { PrismaClient } from '@prisma/client'
import { StandartRow } from './degiroCsvParser'
import removeAllAccountRows from '../accountRows/removeAllAccountRows'

export const removeAllDegiroAccountRows = async (
  standardisedDegiroRows: StandartRow[]
) => {
  await removeAllAccountRows('Degiro', standardisedDegiroRows)
}

// {
//   const prisma = new PrismaClient()
//   try {
//     const data = await prisma.accountRow.deleteMany({
//       where: {
//         account: {
//           name: 'Degiro'
//         }
//       }
//     })
//     await prisma.$disconnect()
//     console.log('🚀 ~ file: removeAllDegiroAccountRows.ts:36 ~ data:', data)
//     return data
//   } catch (error) {
//     console.log(
//       '🚀 ~ file: removeAllDegiroAccountRows.ts:10 ~ removeAllDegiroAccountRows ~ error:',
//       error
//     )
//     await prisma.$disconnect()
//     process.exit(1)
//   }
// }
