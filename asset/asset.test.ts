import { expect, it } from 'vitest'
import getAssets, { getAssets2 } from './getAssets'

const expected = [
  'AM.PEA SP500 ESG UCIT ETF EUR',
  'BTC',
  'ISHARES PHYSICAL GOLD ETC',
  'Immeuble (remboursé)',
  'Liquide',
  'MACSF',
  'ROBLOX CORP -CLASS A'
]

it('There is at least 1 asset in the database.', async () => {
  const assets = await getAssets()
  expect(assets.length).toBeGreaterThan(0)
})
it('Assets in database have a name.', async () => {
  const assets = await getAssets()
  const noNameAssets = assets.filter(
    (asset) =>
      asset.name === null || asset.name === undefined || asset.name === ''
  )
  expect(noNameAssets.length).toBe(0)
})
it('Expected assets are in the database.', async () => {
  const assets = await getAssets()
  const sortedAssets = assets.map((a) => a.name).sort()
  expected.forEach((item) => {
    expect(sortedAssets).toContain(item)
  })
})
it('Assets in database have a price greater then 0.', async () => {
  const assets = await getAssets()
  const noPriceAssets = assets.filter(
    (asset) =>
      asset.price === null || asset.price === undefined || asset.price === 0
  )
  expect(noPriceAssets.length).toBe(0)
})
it('Assets in database have a sub category.', async () => {
  const assets = await getAssets()
  const noSubCategoryAssets = assets.filter(
    (asset) => asset.subCategoryId === null || asset.subCategoryId === undefined
  )
  expect(noSubCategoryAssets.length).toBe(0)
})
it('Assets in database have at least 1 account row.', async () => {
  const assets = await getAssets2()
  const noAccountRowAssets = assets.filter(
    (asset) => asset.accountRows.length === 0
  )
  expect(noAccountRowAssets.length).toBe(0)
})
