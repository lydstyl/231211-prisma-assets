import createOrUpdateAssetsFromAccount from '../accounts/createOrUpdateAssetsFromAccount'
import { StandartRow } from '../degiro/degiroCsvParser'
import removeAllAccountRows from '../accountRows/removeAllAccountRows'
// import { createOrUpdateAssetsFromDegiro } from './createOrUpdateAssetsFromDegiro'
// import { removeAllDegiroAccountRows } from './removeAllDegiroAccountRows'

export const updateDBWithAccount = async (
  account: string,
  standardisedDegiroRows: StandartRow[]
) => {
  try {
    // await removeAllDegiroAccountRows(standardisedDegiroRows)
    // await createOrUpdateAssetsFromDegiro(standardisedDegiroRows)
    await removeAllAccountRows(account, standardisedDegiroRows)
    await createOrUpdateAssetsFromAccount(account, standardisedDegiroRows)
  } catch (error) {
    console.log('🚀 ~ file: main.ts:11 ~ updateDBWithDegiro ~ error:', error)
  }
}
