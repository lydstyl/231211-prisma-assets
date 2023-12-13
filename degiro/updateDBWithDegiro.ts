import { StandartRow } from '../degiroCsvParser'
import { createOrUpdateAssetsFromDegiro } from './createOrUpdateAssetsFromDegiro'
import { removeAllDegiroAccountRows } from './removeAllDegiroAccountRows'

export const updateDBWithDegiro = async (
  standardisedDegiroRows: StandartRow[]
) => {
  try {
    await removeAllDegiroAccountRows(standardisedDegiroRows)
    await createOrUpdateAssetsFromDegiro(standardisedDegiroRows)
    // const updateDegiroAssetsWithNewPrice = async () => {}
    // const addNewDegiroAccountRows = async () => {}
  } catch (error) {
    console.log('🚀 ~ file: main.ts:11 ~ updateDBWithDegiro ~ error:', error)
  }
}
