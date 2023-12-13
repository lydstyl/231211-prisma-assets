import { PrismaClient } from '@prisma/client'
import { StandartRow } from '../degiroCsvParser'

export const createOrUpdateAssetsFromDegiro = async (
  standardisedDegiroRows: StandartRow[]
) => {
  const prisma = new PrismaClient()
  try {
    // find Account Id
    const account = await prisma.account.findFirst({
      where: {
        name: 'Degiro'
      }
    })
    if (!account) {
      throw new Error(`Account with name "Degiro" is not found in DB.`)
    }

    standardisedDegiroRows.forEach(async (row) => {
      // create or update asset
      const upsertAsset = await prisma.asset.upsert({
        where: {
          sourceId: row.id
        },
        update: {
          sourceName: row.name,
          price: row.price
        },
        create: {
          name: row.name,
          sourceId: row.id
        }
      })

      // create account row
      await prisma.accountRow.create({
        data: {
          accountId: account.id,
          assetId: upsertAsset.id,
          qty: row.qty
        }
      })
    })

    await prisma.$disconnect()
  } catch (error) {
    console.log(
      '🚀 ~ file: createOrUpdateAssetsFromDegiro.ts:9 ~ error:',
      error
    )
    await prisma.$disconnect()
    process.exit(1)
  }
}
