import * as fs from 'fs'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'
import path from 'path'
import { StandartRow } from './degiroCsvParser'
import { parseQty } from './pea/peaCSVParser'
import { PrismaClient } from '@prisma/client'

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
  const standardisedmanualBankAccounts = await parseManualBankAccountsCSV()

  const prisma = new PrismaClient()
  try {
    // find sub category id of cash en banque
    const dbSubCategory = await prisma.subCategory.findFirst({
      where: {
        name: 'cash en banque'
      }
    })

    standardisedmanualBankAccounts.forEach(async (account) => {
      // create or update accounts and keep ID
      const dbAccount = await prisma.account.upsert({
        where: {
          name: account.name
        },
        create: {
          name: account.name
        },
        update: {
          name: account.name
        }
      })

      // create or update asset with price and name is "CASH " + accountName to upper case and keep ID
      const dbAssset = await prisma.asset.upsert({
        where: {
          name: 'CASH ' + account.name.toUpperCase()
        },
        create: {
          name: 'CASH ' + account.name.toUpperCase(),
          price: account.price,
          subCategoryId: dbSubCategory?.id || null
        },
        update: {
          name: 'CASH ' + account.name.toUpperCase(),
          price: account.price // should always be 1 € ?
        }
      })

      // delete all account rows of each bank account of this csv
      await prisma.accountRow.deleteMany({
        where: {
          accountId: dbAccount.id
        }
      })

      // re create all account rows with qty assetId and accountId
      const dbAccountRow = await prisma.accountRow.create({
        data: {
          accountId: dbAccount.id,
          assetId: dbAssset.id,
          qty: account.qty
        }
      })

      await prisma.$disconnect()
      return account?.id
    })
  } catch (error) {
    console.log(
      '🚀 ~ file: createOrUpdateAssetsFromDegiro.ts:63 ~ findAccountId ~ error:',
      error
    )
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default updateDBWithManualBankAccounts
