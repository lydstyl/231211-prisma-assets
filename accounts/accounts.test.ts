import { expect, it } from 'vitest'
import getAccounts from './getAccounts'

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
  const accounts = await getAccounts()
  expect(accounts.length).toBe(expectedAccounts.length)
})
it('Expected accounts in lowercase are in database.', async () => {
  const accounts = await getAccounts()
  expect(accounts.map((account) => account.name.toLowerCase()).sort()).toEqual(
    expectedAccounts.map((account) => account.toLowerCase()).sort()
  )
})
it('Expected accounts are in database.', async () => {
  const accounts = await getAccounts()
  expect(accounts.map((account) => account.name).sort()).toEqual(
    expectedAccounts.map((account) => account).sort()
  )
})
