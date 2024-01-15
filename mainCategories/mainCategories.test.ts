import { expect, it } from 'vitest'
import getMainCategories from './getMainCategories'

const expected = ['bourse', 'cash', 'commodity', 'crypto', 'immo']

it('There is at least 1 main category in the database.', async () => {
  const mainCategories = await getMainCategories()
  expect(mainCategories.length).toBeGreaterThan(0)
})
it('Expected main categories are in the database.', async () => {
  const mainCategories = await getMainCategories()
  expect(mainCategories.map((m) => m.name).sort()).toEqual(expected)
})
