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

const dbAccountUpdaters = [
  {
    account: 'Degiro',
    sourceData: parseDegioCSV
  },
  {
    account: 'PEA',
    sourceData: parsePeaCsv
  }

  //////////////////////// todo with API
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
    ////////////////////////
    // await createOrUpdateAccounts(accountNames)
    ////////////////////////
    // // create or update category and subcategories WARNING : this remove manuals connections between assets and sub categories
    // await createOrUpdateAllCategories(allCategories)
    ////////////////////////
    // dbAccountUpdaters.forEach(async (dbAccountUpdater) => {
    //   const standardisedRows = await dbAccountUpdater.sourceData()
    //   await updateDBWithAccount(dbAccountUpdater.account, standardisedRows)
    // })
    ////////////////////////
    // // await updateDBWithManualBankAccounts()
    // // await updateDBWithManualAssets()
    // // this one replace the 2 above
    await updateDBWithManualAssets2()
    ////////////////////////
    const allAssets = await getAssets()
    makeCSVWithAllAssets(allAssets)
  } catch (error) {
    console.log('🚀 ~ file: degiroCsvParser.ts:72 ~ run ~ error:', error)
  }
})()
