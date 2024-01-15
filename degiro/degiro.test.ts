import { expect, it } from 'vitest'
import { parseDegioCSV } from './degiroCsvParser'

const expected = [
  {
    id: 'Cash Degiro',
    name: 'CASH & CASH FUND & FTX CASH (EUR)',
    qty: 291.42,
    price: 1
  },
  {
    id: 'LU1829218749',
    name: 'AMUNDI BLOOMBERG EQUAL-WEIGHT CO...',
    qty: 325,
    price: 20.92
  },
  {
    id: 'LU1681048630',
    name: 'AMUNDI S&P GLOBAL LUXU',
    qty: 10,
    price: 193.4
  },
  {
    id: 'IE000PB4LRO2',
    name: 'AMUNDI MSCI WORLD ESG CTB NET ZE...',
    qty: 329,
    price: 6.93
  },
  { id: 'US4581401001', name: 'INTEL CORP', qty: 5, price: 43 },
  {
    id: 'LU1650490474',
    name: 'LYXOR EURO GOVERNMENT BOND (DR) ...',
    qty: 4,
    price: 165.97
  },
  {
    id: 'US7710491033',
    name: 'ROBLOX CORP -CLASS A',
    qty: 33,
    price: 37.368181818181824
  },
  {
    id: 'US92847W1036',
    name: 'VITAL FARMS INC. - COMMON STOCK',
    qty: 1,
    price: 13.93
  },
  {
    id: 'IE00BM67HM91',
    name: 'XTRACKERS MSCI WORLD ENERGY UCIT...',
    qty: 26,
    price: 41.96
  },
  {
    id: 'IE00BF4RFH31',
    name: 'ISHARES MSCI WORLD SMALL CAP UCI...',
    qty: 125,
    price: 6.23
  },
  {
    id: 'IE00B4ND3602',
    name: 'ISHARES PHYSICAL GOLD ETC',
    qty: 133,
    price: 36.44
  }
]

it(
  'Degiro csv parser test.',
  async () => {
    const digiroParsedCSV = await parseDegioCSV(
      '/home/gbp2204/Téléchargements/Portfolio.csv'
    )
    expect(digiroParsedCSV).toEqual(expected)
  },
  { timeout: 5000 }
)
