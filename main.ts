import { parseDegioCSV } from './degiroCsvParser'
import { updateDBWithDegiro } from './degiro/updateDBWithDegiro'
import { createOrUpdateAccounts } from './createOrUpdateAccounts'
import { accounts as accountNames, allCategories } from './constancies'
import { createOrUpdateAllCategories } from './createOrUpdateAllCategories'
import { getAssets, runGetAccounts } from './getAccounts'
import { makeCSVWithAllAssets } from './makeCSVWithAllAssets'
;(async function run() {
  try {
    // // create or update accounts
    // const accounts = await createOrUpdateAccounts(accountNames)
    ////////////////////////
    // // create or update category and subcategories WARNING : this remove manuals connections between assets and sub categories
    // const accounts = await createOrUpdateAllCategories(allCategories)
    ////////////////////////
    // // UPDATE DB WITH DEGIRO
    // const standardisedDegiroRows = await parseDegioCSV()
    // await updateDBWithDegiro(standardisedDegiroRows)
    ////////////////////////
    // // UPDATE DB WITH PEA
    // // do the same with PEACsvParser
    ////////////////////////
    // // UPDATE DB
    // // optional or later do the same with bitstampDBUpdater
    // // UPDATE DB
    // // optional or later do the same with binanceDBUpdater
    // // UPDATE DB
    // // do the same with manualDBUpdater for other assets (make sur all accounts from cash vision are done)
    // // EXTRACT DATA FROM DB
    // // in a new file get patrimony data
    // // in an other file make a patrimony csv export
    // // make a CSV with all assets by categories
    ////////////////////////
    // // EXTRACT DATA FROM DB
    // const data = await runGetAccounts()
    const data = await getAssets()

    ////////////////////////
    // make a CSV with all assets by account with all data
    makeCSVWithAllAssets(data)
    // // check total is equal to cash vision
    // // Create donuts
  } catch (error) {
    console.log('🚀 ~ file: degiroCsvParser.ts:72 ~ run ~ error:', error)
  }
})()
