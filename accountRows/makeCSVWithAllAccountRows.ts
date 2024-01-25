import * as path from 'path'
import { CsvFile } from '../asset/makeCSVWithAllAssets'
import { DBAccountRow, gatAccountRows } from './getAccountRows'

const mapAccountRows = (dbAccountRows: DBAccountRow[]) =>
  dbAccountRows.map((row) => ({
    account: row.account.name,
    mainCategory: row.asset.subCategory?.mainCategory?.name,
    subcategory: row.asset.subCategory?.name,
    asset: row.asset.name,
    assetSourceId: row.asset.sourceId,
    qty: row.qty,
    price: row.asset.price,
    total: row.qty * row.asset.price
  }))

type mapedAccountRow = {
  account: string
  mainCategory: string | undefined
  subcategory: string | undefined
  asset: string
  assetSourceId: string | null
  qty: number
  price: number
  total: number
}

const createCSVWithAllAccountRows = async (
  mapedAccountRows: CSVAccountRow[]
) => {
  try {
    const csvFile = new CsvFile({
      path: path.resolve(__dirname, 'append.tmp.csv'),
      // headers to write
      headers: [
        'account',
        'mainCategory',
        'subcategory',
        'asset',
        'assetSourceId',
        'qty',
        'price',
        'total'
      ]
    })

    await csvFile.create(mapedAccountRows)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

type CSVAccountRow = {
  account: string
  mainCategory: string | undefined
  subcategory: string | undefined
  asset: string
  assetSourceId: string | null
  qty: string
  price: string
  total: string
}

const mapAccountRowsToCSVRows = (
  mapedAccountRows: mapedAccountRow[]
): CSVAccountRow[] => {
  return mapedAccountRows.map((row) => ({
    ...row,
    qty: `${row.qty}`.replace('.', ','),
    price: `${row.price}`.replace('.', ','),
    total: `${row.total.toFixed(2)}`.replace('.', ',')
  }))
}

const makeCSVWithAllAccountRows = async () => {
  const dbAccountRows = await gatAccountRows()
  const mapedAccountRows = mapAccountRows(dbAccountRows)

  const csvAccountRows = mapAccountRowsToCSVRows(mapedAccountRows)

  await createCSVWithAllAccountRows(csvAccountRows)
}

export default makeCSVWithAllAccountRows
