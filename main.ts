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

const dbAccountUpdaters = [
  {
    account: 'Degiro',
    sourceData: parseDegioCSV
  },
  {
    account: 'PEA',
    sourceData: parsePeaCsv
  }

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
    // // UPDATE DB
    // // do the same with manualDBUpdater for other assets (make sur all accounts from cash vision are done)
    await updateDBWithManualBankAccounts()
    ////////////////////////
    // const data = await getAssets()
    // console.log('🚀 ~ file: main.ts:47 ~ run ~ data:', data)
    // makeCSVWithAllAssets(data)
  } catch (error) {
    console.log('🚀 ~ file: degiroCsvParser.ts:72 ~ run ~ error:', error)
  }
})()
