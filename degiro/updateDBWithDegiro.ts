// import createOrUpdateAssetsFromAccount from '../accounts/createOrUpdateAssetsFromAccount'
import { updateDBWithAccount } from '../accounts/updateDBWithAccount'
import { StandartRow } from '../degiroCsvParser'
// import removeAllAccountRows from '../removeAllAccountRows'
// import { createOrUpdateAssetsFromDegiro } from './createOrUpdateAssetsFromDegiro'
// import { removeAllDegiroAccountRows } from './removeAllDegiroAccountRows'

export const updateDBWithDegiro = async (
  standardisedDegiroRows: StandartRow[]
) => {
  await updateDBWithAccount('Degiro', standardisedDegiroRows)
}

// {
//   try {
//     // await removeAllDegiroAccountRows(standardisedDegiroRows)
//     // await createOrUpdateAssetsFromDegiro(standardisedDegiroRows)
//     await removeAllAccountRows('Degiro', standardisedDegiroRows)
//     await createOrUpdateAssetsFromAccount('Degiro', standardisedDegiroRows)
//   } catch (error) {
//     console.log('🚀 ~ file: main.ts:11 ~ updateDBWithDegiro ~ error:', error)
//   }
// }
