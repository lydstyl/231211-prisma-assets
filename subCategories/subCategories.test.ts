import { expect, it } from 'vitest'
import getSubCategories from './getSubCategories'

const expected = [
  'ETF EM',
  'ETF Europe',
  'ETF SP500',
  'Immeuble',
  'Roubaix',
  'St Amand',
  'Vicoigne',
  'autre bourse',
  'autre cash',
  'autre commodity',
  'autre crypto',
  'bitcoin',
  'cash avant impot',
  'cash en banque',
  'etherium',
  'gold',
  'liquide',
  'stablecoin'
]

it('There is at least 1 sub category in the database.', async () => {
  const subCategories = await getSubCategories()
  expect(subCategories.length).toBeGreaterThan(0)
})
it('Expected sub categories are in the database.', async () => {
  const subCategories = await getSubCategories()
  expect(subCategories.map((s) => s.name).sort()).toEqual(expected)
})
it('All sub categories in the database have a main category.', async () => {
  const subCategories = await getSubCategories()
  const subCatsWithoutMainCat = subCategories.filter(
    (s) => s.mainCategoryId === null || s.mainCategoryId === undefined
  )
  expect(subCatsWithoutMainCat.length).toBe(0)
})
