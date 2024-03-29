import * as path from 'path'
import * as fs from 'fs'
import { FormatterOptionsArgs, Row, writeToStream } from '@fast-csv/format'

import { GetAssets } from '../accounts/getAccounts'

type AssetsForCSV = {
  sourceId: string | null
  name: string
  price: number
  sourceName: string | null
  subcategory: string | undefined
  mainCategory: string | undefined
  qty: number
  account: string
}[]

export const makeCSVWithAllAssets = (assets: GetAssets) => {
  // keep only importante
  const newAssets = assets.map((asset) => ({
    sourceId: asset.sourceId,
    name: asset.name,
    price: asset.price,
    sourceName: asset.sourceName,
    subcategory: asset.subCategory?.name,
    mainCategory: asset.subCategory?.mainCategory?.name,
    qty: asset.accountRows[0]?.qty,
    account: asset.accountRows[0]?.account.name
  }))

  createCSVForAllAssets(newAssets)
}

type CsvFileOpts = {
  headers: string[]
  path: string
}

export class CsvFile {
  static write(
    stream: NodeJS.WritableStream,
    rows: Row[],
    options: FormatterOptionsArgs<Row, Row>
  ): Promise<void> {
    return new Promise((res, rej) => {
      writeToStream(stream, rows, { ...options, delimiter: ';' })
        .on('error', (err: Error) => rej(err))
        .on('finish', () => res())
    })
  }

  private readonly headers: string[]

  private readonly path: string

  private readonly writeOpts: FormatterOptionsArgs<Row, Row>

  constructor(opts: CsvFileOpts) {
    this.headers = opts.headers
    this.path = opts.path
    this.writeOpts = { headers: this.headers, includeEndRowDelimiter: true }
  }

  create(rows: Row[]): Promise<void> {
    return CsvFile.write(fs.createWriteStream(this.path), rows, {
      ...this.writeOpts
    })
  }

  append(rows: Row[]): Promise<void> {
    return CsvFile.write(
      fs.createWriteStream(this.path, { flags: 'a' }),
      rows,
      {
        ...this.writeOpts,
        // dont write the headers when appending
        writeHeaders: false
      } as FormatterOptionsArgs<Row, Row>
    )
  }

  read(): Promise<Buffer> {
    return new Promise((res, rej) => {
      fs.readFile(this.path, (err, contents) => {
        if (err) {
          return rej(err)
        }
        return res(contents)
      })
    })
  }
}

async function createCSVForAllAssets(assets: AssetsForCSV) {
  try {
    const csvFile = new CsvFile({
      path: path.resolve(__dirname, 'append.tmp.csv'),
      // headers to write
      headers: [
        'account',
        'mainCategory',
        'subcategory',
        'sourceId',
        'name',
        'sourceName',
        'qty',
        'price'
      ]
    })

    await csvFile.create(assets)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

type CSVValues = {
  [key: string]: string
}
export async function createCSV(headers: string[], csvValues: CSVValues[]) {
  try {
    const csvFile = new CsvFile({
      path: path.resolve(__dirname, 'append.tmp.csv'),
      // headers to write
      headers
    })

    await csvFile.create(csvValues)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
