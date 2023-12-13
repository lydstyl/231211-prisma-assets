import { parseDegioCSV } from './degiroCsvParser'
import { updateDBWithDegiro } from './degiro/updateDBWithDegiro'
;(async function run() {
  try {
    const standardisedDegiroRows = await parseDegioCSV()

    // UPDATE DB
    await updateDBWithDegiro(standardisedDegiroRows)

    // UPDATE DB
    // do the same with PEACsvParser

    // UPDATE DB
    // optional or later do the same with bitstampDBUpdater

    // UPDATE DB
    // optional or later do the same with binanceDBUpdater

    // UPDATE DB
    // do the same with manualDBUpdater for other assets (make sur all accounts from cash vision are done)

    // EXTRACT DATA FROM DB
    // in a new file get patrimony data
    // in an other file make a patrimony csv export
    // make a CSV with all assets by categories

    // EXTRACT DATA FROM DB
    // make a CSV with all assets by account with all data

    // check total is equal to cash vision
    // Create donuts
  } catch (error) {
    console.log('🚀 ~ file: degiroCsvParser.ts:72 ~ run ~ error:', error)
  }
})()
