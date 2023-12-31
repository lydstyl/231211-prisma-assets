import { parseDegioCSV } from './degiroCsvParser'
import { updateDBWithDegiro } from './degiro/updateDBWithDegiro'
import { createOrUpdateAccounts } from './createOrUpdateAccounts'
import { accounts as accountNames, allCategories } from './constancies'
import { createOrUpdateAllCategories } from './createOrUpdateAllCategories'
import { getAssets, runGetAccounts } from './getAccounts'
import { makeCSVWithAllAssets } from './makeCSVWithAllAssets'
import { updateDBWithAccount } from './accounts/updateDBWithAccount'
import parsePeaCsv from './pea/peaCSVParser'
import updateDBWithManualBankAccounts from './updateDBWithManualBankAccounts'
import updateDBWithManualAssets from './updateDBWithManualAssets'
import updateDBWithManualAssets2 from './updateDBWithManualAssets2'
import makeCSVWithAllAccountRows from './makeCSVWithAllAccountRows'

const dbAccountUpdaters = [
  {
    account: 'Degiro',
    sourceData: parseDegioCSV
  },
  {
    account: 'PEA',
    sourceData: parsePeaCsv
  }

  //////////////////////// todo with API then make unit tests
  // {
  //   account: 'Bitstamp',
  //   sourceData: getDataFromBitstampAPI
  // },
  // {
  //   account: 'Binance',
  //   sourceData: getDataFromBinanceAPI
  // },
]

;(async function run() {
  try {
    //////////////////////// STEP 0 TODO WITH AN EMPTY DB OR AVOID THIS STEP
    // await createOrUpdateAccounts(accountNames)
    // // create or update category and subcategories WARNING : this remove manuals connections between assets and sub categories
    // await createOrUpdateAllCategories(allCategories)

    //////////////////////// STEP 1 use dbAccountUpdaters
    // dbAccountUpdaters.forEach(async (dbAccountUpdater) => {
    //   const standardisedRows = await dbAccountUpdater.sourceData()
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
