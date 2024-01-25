import { expect, it } from 'vitest'
import getAccountsBasic from './getAccountsBasic'
import { getAccounts } from './getAccounts'

const expectedAccounts: string[] = [
  'BNP Perso',
  'Binance',
  'Bitstamp',
  'Boursorama',
  'CA Freelance',
  'Capgemini',
  'Degiro',
  'Etoro',
  'Immeuble (remboursé)',
  'Ledger 1 NATIVE SEGWIT',
  'Ledger 1 SEGWIT',
  'Ledger 1 black NATIVE SEGWIT',
  'Ledger 2 black SEGWIT',
  'Ledger Ethereum 1',
  // 'Les ledgers (Ledger Live)',
  'Liquide',
  'Livret A',
  'MACSF',
  'Mutavie',
  'PEA',
  'PEA PME espèce',
  'PEA espèce',
  'Roubaix',
  'SCI',
  'St Amand',
  'Tableau Laporte',
  'Vicoigne'
]

it(`There is ${expectedAccounts.length} accounts in databse.`, async () => {
  const accounts = await getAccountsBasic()
  expect(accounts.length).toBe(expectedAccounts.length)
})
it('Expected accounts in lowercase are in database.', async () => {
  const accounts = await getAccountsBasic()
  expect(accounts.map((account) => account.name.toLowerCase()).sort()).toEqual(
    expectedAccounts.map((account) => account.toLowerCase()).sort()
  )
})
it('Expected accounts are in database.', async () => {
  const accounts = await getAccountsBasic()
  expect(accounts.map((account) => account.name).sort()).toEqual(
    expectedAccounts.map((account) => account).sort()
  )
})
it('All account in databse have a name.', async () => {
  const accounts = await getAccountsBasic()
  const accountsWithoutName = accounts.filter((account) => !account.name)
  expect(accountsWithoutName.length).toBe(0)
})
it('All account in databse have more then 0 account row.', async () => {
  const accounts = await getAccounts()
  const accountsWithoutRow = accounts.filter(
    (account) => account.accountRows.length === 0
  )
  expect(accountsWithoutRow.length).toBe(0)
})
it('There is at least 1 account that has 2 or more rows.', async () => {
  const accounts = await getAccounts()
  const accountsWith2Rows = accounts.filter(
    (account) => account.accountRows.length >= 2
  )
  expect(accountsWith2Rows.length).toBeGreaterThan(0)
})
it('Account with 2 or more rows have rows with different assetId.', async () => {
  const accounts = await getAccounts()
  const accountsWith2Rows = accounts.filter(
    (account) => account.accountRows.length >= 2
  )
  const accountsWith2RowsWithSameAssetId = accountsWith2Rows.filter(
    (account) =>
      account.accountRows.filter(
        (row) => row.assetId === account.accountRows[0].assetId
      ).length === account.accountRows.length
  )
  expect(accountsWith2RowsWithSameAssetId.length).toBe(0)
})
