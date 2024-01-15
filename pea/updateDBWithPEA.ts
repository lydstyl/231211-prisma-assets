import { StandartRow } from '../degiro/degiroCsvParser'
import { removeAllAccountRows } from '../removeAllAccountRows'

export const updateDBWithPEA = async (
  standardisedDegiroRows: StandartRow[]
) => {
  try {
    await removeAllAccountRows('PEA', standardisedDegiroRows)
    // await createOrUpdateAssetsFromDegiro(standardisedDegiroRows)
  } catch (error) {
    console.log('🚀 ~ file: main.ts:11 ~ updateDBWithDegiro ~ error:', error)
  }
}
