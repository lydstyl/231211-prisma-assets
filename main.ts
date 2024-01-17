import { parseDegioCSV } from './degiro/degiroCsvParser'
import { updateDBWithDegiro } from './degiro/updateDBWithDegiro'
import { createOrUpdateAccounts } from './accounts/createOrUpdateAccounts'
import { accounts as accountNames, allCategories } from './constancies'
import { createOrUpdateAllCategories } from './mainCategories/createOrUpdateAllCategories'
import { getAssets, runGetAccounts } from './accounts/getAccounts'
import { makeCSVWithAllAssets } from './asset/makeCSVWithAllAssets'
import { updateDBWithAccount } from './accounts/updateDBWithAccount'
import parsePeaCsv from './pea/peaCSVParser'
import updateDBWithManualBankAccounts from './accounts/updateDBWithManualBankAccounts'
import updateDBWithManualAssets from './asset/updateDBWithManualAssets'
import updateDBWithManualAssets2 from './asset/updateDBWithManualAssets2'
import makeCSVWithAllAccountRows from './accountRows/makeCSVWithAllAccountRows'

const dbAccountUpdaters = [
  {
    account: 'Degiro',
    sourceData: parseDegioCSV,
    csvPath: '/home/gbp2204/Téléchargements/Portfolio.csv'
  },
  {
    account: 'PEA',
    sourceData: parsePeaCsv,
    csvPath: '/home/gbp2204/Téléchargements/xxx.csv' // todo change so it use this param // todo2 test degiro and pea csv exists
  }
]

;(async function run() {
  try {
    //////////////////////// STEP 0 TODO WITH AN EMPTY DB OR AVOID THIS STEP
    // await createOrUpdateAccounts(accountNames) // todo test
    // // create or update category and subcategories WARNING : this remove manuals connections between assets and sub categories
    // await createOrUpdateAllCategories(allCategories) // todo test

    //////////////////////// STEP 1 use dbAccountUpdaters
    // dbAccountUpdaters.forEach(async (dbAccountUpdater) => {
    //   const standardisedRows = await dbAccountUpdater.sourceData(
    //     dbAccountUpdater.csvPath
    //   )
    //   await updateDBWithAccount(dbAccountUpdater.account, standardisedRows)
    // })

    //////////////////////// STEP 2 create a CSV with Prisma Asset YYYY speadsheets then use it to update DB
    // await updateDBWithManualAssets2()

    //////////////////////// STEP 3 create the csv then go to Prisma Asset YYYY speadsheets and import it
    await makeCSVWithAllAccountRows()

    //////////////////////// STEP 4 make TCD and donuts in Prisma Asset YYYY speadsheets

    //////////////////////// STEP 5 take action for a re-arbitration
  } catch (error) {
    console.log('🚀 ~ file: degiroCsvParser.ts:72 ~ run ~ error:', error)
  }
})()
