import { expect, it } from 'vitest'
import parsePeaCsv from './peaCSVParser'
import path from 'path'

const expectedItems = [
  {
    id: 'FR0013412038',
    name: 'AM.ETF PEA MSCI EUROPE UC.ETF',
    qty: 203,
    price: 27.2
  },
  {
    id: 'FR0013412020',
    name: 'AM.PEA MSCI EM ESG LEAD.UC.ETF',
    qty: 455,
    price: 20.16
  },
  {
    id: 'LU1681042864',
    name: 'AM.PEA MSCI USA UCITS ETF EURC',
    qty: 12,
    price: 551.99
  },
  {
    id: 'FR0013412285',
    name: 'AM.PEA SP500 ESG UCIT ETF EUR',
    qty: 542,
    price: 35.099
  },
  {
    id: 'LU1598689153',
    name: 'LYX.MSCI EMU SM.CAP DR UC.ETF',
    qty: 23,
    price: 327.33
  }
]

it('Pea csv parser test.', async () => {
  const csvPath = path.resolve(
    __dirname,
    '../csv',
    'POSITIONS_05510697402_20231212062308.csv'
  )
  const peaParsedCSV = await parsePeaCsv()
  expect(peaParsedCSV).toEqual(expectedItems)
})
