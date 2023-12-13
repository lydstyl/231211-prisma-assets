import { StandartRow } from '../degiroCsvParser'
import { removeAllDegiroAccountRows } from './removeAllDegiroAccountRows'

export const updateDBWithDegiro = async (
  standardisedDegiroRows: StandartRow[]
) => {
  try {
    await removeAllDegiroAccountRows(standardisedDegiroRows)
    // const addNewAssetsFromDegiroCSV = async () => {}
    // const updateDegiroAssetsWithNewPrice = async () => {}
    // const addNewDegiroAccountRows = async () => {}
  } catch (error) {
    console.log('🚀 ~ file: main.ts:11 ~ updateDBWithDegiro ~ error:', error)
  }
}
