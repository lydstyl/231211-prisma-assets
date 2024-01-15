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

// Produit,Ticker/ISIN,Quantité,Clôture,Devise,Montant en EUR
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

export const parseDegioCSV = (csvPath: string): Promise<StandartRow[]> =>
  new Promise((resolve, reject) => {
    if (!csvPath) {
      csvPath = path.resolve(__dirname, 'csv', csvName)
    }
    // const csvPath2 = path.resolve(__dirname, 'csv', csvName)
    try {
      fs.createReadStream(csvPath)
        .pipe(csv.parse({ headers: true }))
        .on('error', (error) => {
          console.log('error A')
          reject(error)
        })
        .on('data', (row) => {
          rows.push(row)
        })
        .on('end', (rowCount: number) => {
          const standardised: StandartRqow[] = rows.map((row) => {
            let price = 1
            let qty = 1
            let id = row['Ticker/ISIN']

            if (row.Produit.includes('CASH')) {
              id = 'Cash Degiro'
              qty = +row['Montant en EUR'].replace(',', '.')
              price = 1
            } else {
              qty = +row.Quantité
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
              qty,
              price
            }
          })
          resolve(standardised)
        })
    } catch (error) {
      console.log('🚀 ~ newPromise ~ error:', error)
      reject(error)
    }
  })
