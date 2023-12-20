import * as fs from 'fs'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'
import path from 'path'
import { StandartRow } from './degiroCsvParser'
import { parseQty, parsePrice } from './pea/peaCSVParser'

dotenv.config()

export const parseManualBankAccountsCSV = (): Promise<StandartRow[]> =>
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

const updateDBWithManualBankAccounts = async () => {
  // parse csv
  // create or update accounts and keep ID
  // create or update asset with price and name is "CASH " + accountName to upper case and keep ID
  // delete all account rows of each bank account of this csv
  // create all account rows with qty assetId and accountId

  const manualBankAccounts = await parseManualBankAccountsCSV()
  console.log(
    '🚀 ~ file: updateDBWithManualBankAccounts.ts:45 ~ updateDBWithManualBankAccounts ~ manualBankAccounts:',
    manualBankAccounts
  )
}

export default updateDBWithManualBankAccounts
