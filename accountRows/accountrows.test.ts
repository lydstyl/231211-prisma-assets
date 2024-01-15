import { expect, it } from 'vitest'
import getAccountRows from '../accountRows/getAccountRows'

it('There is at least 1 account row.', async () => {
  const accountRows = await getAccountRows()
  expect(accountRows.length).toBeGreaterThan(0)
})
it('All account rows in database have qty greater then 0.', async () => {
  const accountRows = await getAccountRows()
  const accountRowsLowerThen0 = accountRows.filter((row) => row.qty <= 0)
  expect(accountRowsLowerThen0.length).toBe(0)
})
it('All account rows in database have assetId.', async () => {
  const accountRows = await getAccountRows()
  const rowsWithAssetId = accountRows.filter((row) => row.assetId >= 0)
  expect(rowsWithAssetId.length).toEqual(accountRows.length)
})
it('All account rows in database have accountId.', async () => {
  const accountRows = await getAccountRows()
  const rowsWithAssetId = accountRows.filter((row) => row.accountId >= 0)
  expect(rowsWithAssetId.length).toEqual(accountRows.length)
})
