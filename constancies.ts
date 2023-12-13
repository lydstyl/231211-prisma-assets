export const accounts = ['Bitstamp', 'Binance', 'PEA', 'Degiro']

export type AllCategories = {
  name: string
  subCategories: string[]
}[]
export const allCategories = [
  {
    name: 'cash',
    subCategories: [
      'liquide',
      'cash en banque',
      // 'stable coin',
      'cash avant impot', // stable coin, cash de la SCI, etc.
      'autre cash'
    ]
  },
  {
    name: 'immo',
    subCategories: ['Vicoigne', 'Roubaix', 'St Amand', 'Immeuble']
  },
  {
    name: 'cypto',
    subCategories: ['bitcoin', 'etherium', 'autre crypto']
  },
  {
    name: 'bourse',
    subCategories: [
      'ETF SP500',
      'ETF Europe',
      'ETF EM',
      // 'action',
      'autre bourse'
    ]
  },
  {
    name: 'commodity',
    subCategories: ['gold', 'autre commodity']
  }
]
