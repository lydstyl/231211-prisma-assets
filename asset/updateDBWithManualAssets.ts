import * as fs from 'fs'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'
import path from 'path'
import { StandartRow } from '../degiro/degiroCsvParser'
import { parseQty } from '../pea/peaCSVParser'
import prisma from '../prismaInstance'

dotenv.config()

export const parseManualAssetsCSV = (): Promise<StandartRow[]> =>
  new Promise((resolve, reject) => {
    const rows: { name: string; qty: string; price: string }[] = []
    fs.createReadStream(
      path.resolve(__dirname, 'csv', process.env.MANUAL_ASSETS as string)
    )
      .pipe(csv.parse({ headers: true, delimiter: ',' }))
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        rows.push(row)
      })
      .on('end', (rowCount: number) => {
        const standardised: StandartRow[] = rows.map((row) => {
          return {
            id: row.name,
            name: row.name,
            qty: parseQty(row.qty),
            price: parseQty(row.price)
          }
        })
        resolve(standardised)
      })
  })

const updateDBWithManualAssets = async () => {
  try {
    // parse csv
    const standardisedmanualAssets = await parseManualAssetsCSV()

    standardisedmanualAssets.forEach(async (csvAssetRow) => {
      // create or update accounts
      const dbAccount = await prisma.account.upsert({
        where: {
          name: csvAssetRow.name
        },
        create: {
          name: csvAssetRow.name
        },
        update: {
          name: csvAssetRow.name
        }
      })

      // create or update assets
      const dbAsset = await prisma.asset.upsert({
        where: { name: csvAssetRow.name },
        create: { name: csvAssetRow.name, price: csvAssetRow.price },
        update: { name: csvAssetRow.name, price: csvAssetRow.price }
      })

      // remove all account rows with accounts id
      await prisma.accountRow.deleteMany({
        where: {
          accountId: dbAccount.id
        }
      })
      // create all account rows with accounts id
      await prisma.accountRow.create({
        data: {
          qty: csvAssetRow.qty,
          accountId: dbAccount.id,
          assetId: dbAsset.id
        }
      })
    })

    await prisma.$disconnect()
  } catch (error) {
    console.log(
      '🚀 ~ file: updateDBWithManualAssets.ts:56 ~ updateDBWithManualAssets ~ error:',
      error
    )
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default updateDBWithManualAssets
