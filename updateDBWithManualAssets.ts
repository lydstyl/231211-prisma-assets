import * as fs from 'fs'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'
import path from 'path'
import { StandartRow } from './degiroCsvParser'
import { parseQty } from './pea/peaCSVParser'
import { PrismaClient } from '@prisma/client'

dotenv.config()

export const parseManualAssetsCSV = (): Promise<StandartRow[]> =>
  new Promise((resolve, reject) => {
    const rows: { name: string; amount: string }[] = []
    fs.createReadStream(
      path.resolve(__dirname, 'csv', process.env.MANUAL_BANK_ACCOUNTS as string)
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
            qty: parseQty(row.amount),
            price: 1
          }
        })
        resolve(standardised)
      })
  })

const updateDBWithManualAssets = async () => {
  // parse csv
  const standardisedmanualBankAccounts = await updateDBWithManualAssets()
}

export default updateDBWithManualAssets
