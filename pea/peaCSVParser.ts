import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'
import dotenv from 'dotenv'
import { StandartRow } from '../degiroCsvParser'

dotenv.config()

// "Nom";"ISIN";"QUANTITE";"COURS";
type DegiroRow = {
  ISIN: string
  Nom: string
  QUANTITE: string
  COURS: string
}

const csvName = process.env.DEGIRO_CSV as string //////
const rows: DegiroRow[] = []

export const parsePeaCsv = (): Promise<StandartRow[]> =>
  new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(__dirname, 'csv', csvName))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        rows.push(row)
      })
      .on('end', (rowCount: number) => {
        const standardised: StandartRow[] = rows.map((row) => {
          return {
            id: row.ISIN,
            name: row.Nom,
            qty: +row.QUANTITE,
            price: +row.COURS.replace(',', '.')
          }
        })
        resolve(standardised)
      })
  })

export default parsePeaCsv
