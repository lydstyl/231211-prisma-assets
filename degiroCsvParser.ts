import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

export type StandartRow = {
  id: string
  name: string
  qty: number
  price: number
}

type DegiroRow = {
  'Ticker/ISIN': string
  Produit: string
  Quantité: string
  Clôture: string
  'Montant en EUR': string
  Devise: string
}

const csvName = process.env.DEGIRO_CSV as string
const rows: DegiroRow[] = []

export const parseDegioCSV = (): Promise<StandartRow[]> =>
  new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, 'csv', csvName))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        rows.push(row)
      })
      .on('end', (rowCount: number) => {
        const standardised: StandartRow[] = rows.map((row) => {
          let price = 1
          let qty = 1
          let id = row['Ticker/ISIN']

          if (row.Produit.includes('CASH')) {
            id = 'Cash Degiro'
            qty = +row['Montant en EUR'].replace(',', '.')
            price = 1
          } else {
            if (!row.Devise.includes('EUR')) {
              price =
                +row['Montant en EUR'].replace(',', '.') /
                +row.Quantité.replace(',', '.')
            } else {
              price = +row.Clôture.replace(',', '.')
            }
          }

          return {
            id,
            name: row.Produit,
            qty: qty ? qty : +row.Quantité,
            price
          }
        })
        resolve(standardised)
      })
  })
