import { PrismaClient } from '@prisma/client'
import { StandartRow } from '../degiroCsvParser'
import { findAccountId } from './findAccountId'

const prisma = new PrismaClient()
export const createOrUpdateAssetsFromAccount = async (
  accountName: string,
  standardisedRows: StandartRow[]
) => {
  try {
    const accountId = await findAccountId(accountName)

    if (!accountId) {
      throw new Error(`Account with name "${accountName}" is not found in DB.`)
    }

    standardisedRows.forEach(async (row) => {
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
          accountId,
          assetId: upsertAsset.id,
          qty: row.qty
        }
      })
    })

    await prisma.$disconnect()
  } catch (error) {
    console.log(
      '🚀 ~ file: createOrUpdateAssetsFromAccount.ts:45 ~ error:',
      error
    )

    await prisma.$disconnect()
    process.exit(1)
  }
}

export default createOrUpdateAssetsFromAccount
