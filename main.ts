import { parseDegioCSV } from './degiroCsvParser'
;(async function run() {
  try {
    const standardisedDegiroRows = await parseDegioCSV
    console.log(
      '🚀 ~ file: degiroCsvParser.ts:70 ~ run ~ standardisedDegiroRows:',
      standardisedDegiroRows
    )
  } catch (error) {
    console.log('🚀 ~ file: degiroCsvParser.ts:72 ~ run ~ error:', error)
  }
})()
