import * as fs from 'fs'
import * as path from 'path'
import * as csv from 'fast-csv'

type StandartRow = {
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

const rows: DegiroRow[] = []

// works only with Degiro
fs.createReadStream(path.resolve(__dirname, 'csv', 'Portfolio.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('error', (error) => console.error(error))
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
    console.log(
      '🚀 ~ file: csvParser.ts:51 ~ .on ~ standardised:',
      standardised
    )
  })
