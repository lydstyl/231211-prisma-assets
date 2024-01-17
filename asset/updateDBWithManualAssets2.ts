import * as fs from 'fs'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'
import path from 'path'
import { parseQty } from '../pea/peaCSVParser'
import prisma from '../prismaInstance'

dotenv.config()

export type CSVManualRow = {
  account: string
  asset: string
  sourceId: string
  qty: string
  price: string
}
export type ManualRowStandardised = {
  account: string
  asset: string
  sourceId: string
  qty: number
  price: number
}

export const parseManualAssetsCSV2 = (): Promise<ManualRowStandardised[]> =>
  new Promise((resolve, reject) => {
    const rows: CSVManualRow[] = []
    fs.createReadStream(
      path.resolve(__dirname, 'csv', process.env.MANUAL_ASSETS2 as string)
    )
      .pipe(csv.parse({ headers: true, delimiter: ',' }))
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        rows.push(row)
      })
      .on('end', (rowCount: number) => {
        const standardised = rows.map((row) => {
          return {
            account: row.account,
            asset: row.asset,
            sourceId: row.sourceId,
            qty: parseQty(row.qty),
            price: parseQty(row.price)
          }
        })

        resolve(standardised)
      })
  })

const updateDBWithManualAssets2 = async () => {
  try {
    // parse csv
    const standardisedmanualAssets = await await parseManualAssetsCSV2()

    standardisedmanualAssets
      // .filter((csvRow) => csvRow.asset === 'ETH')
      .forEach(async (csvAssetRow) => {
        // create or update accounts
        const dbAccount = await prisma.account.upsert({
          where: {
            name: csvAssetRow.account
          },
          create: {
            name: csvAssetRow.account
          },
          update: {
            name: csvAssetRow.account
          }
        })

        // create or update assets
        if (csvAssetRow.price === 0) {
          var dbAsset = await prisma.asset.upsert({
            where: { name: csvAssetRow.asset },
            create: { name: csvAssetRow.asset },
            update: { name: csvAssetRow.asset }
          })
        } else {
          var dbAsset = await prisma.asset.upsert({
            where: { name: csvAssetRow.asset },
            create: { name: csvAssetRow.asset, price: csvAssetRow.price },
            update: { name: csvAssetRow.asset, price: csvAssetRow.price }
          })
        }

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
      '🚀 ~ file: updateDBWithManualAssets2.ts:100 ~ updateDBWithManualAssets2 ~ error:',
      error
    )

    await prisma.$disconnect()
    process.exit(1)
  }
}

export default updateDBWithManualAssets2
