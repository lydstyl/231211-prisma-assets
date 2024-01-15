import { expect, it } from 'vitest'
import getAssets from './getAssets'

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
it('Assets in database have a price.', async () => {
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
