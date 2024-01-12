import dotenv from 'dotenv'
import { Spot } from '@binance/connector-typescript'
dotenv.config()

const BASE_URL = 'https://api.binance.com'

const spot = new Spot(
  process.env.BINANCE_API_KEY,
  process.env.BINANCE_API_SECRET,
  { baseURL: BASE_URL }
)

const otherWatchedAssets =
  (process.env.BINANCE_OTHER_WATCHED_ASSETS &&
    process.env.BINANCE_OTHER_WATCHED_ASSETS.split(' - ')) ||
  []

const blackListAssets =
  (process.env.BINANCE_BLACK_LIST &&
    process.env.BINANCE_BLACK_LIST.split(' - ')) ||
  []

const getSymbols = async () => {
  try {
    const resTicker24hr = await spot.ticker24hr()

    if (Array.isArray(resTicker24hr)) {
      var resTicker24hr2 = resTicker24hr.map((r) => ({
        symbol: r.symbol,
        lastPrice: +r.lastPrice
      }))
      var symbols = resTicker24hr2.map((r) => r.symbol)

      return symbols
    }
  } catch (error) {
    console.log('🚀 ~ getSymbols ~ error:', error)
  }
}

const binanceFun = async () => {
  try {
    const symbols = await getSymbols()
    if (!symbols) {
      return
    }

    const resAccountInfo = await spot.accountInformation()

    const balances = resAccountInfo.balances
      .filter((balance) => {
        if (!blackListAssets.includes(balance.asset)) {
          return true
        }
      })
      .map((balance) => {
        const symbol = `${balance.asset}BTC`

        if (symbols.includes(symbol)) {
          const promise = spot
            .currentAveragePrice(`${balance.asset}BTC`)
            .then((val) => ({
              asset: balance.asset,
              qty,
              val
            }))

          const qty = +balance.free + +balance.locked

          return promise
        } else if (
          +balance.free > 0.0001 ||
          (+balance.locked > 0.0001 &&
            otherWatchedAssets.includes(balance.asset))
        ) {
          console.log('Other watched assets : ', balance)

          return new Promise<{
            asset: string
            qty: number
            val: { price: string }
          }>((resolve, reject) => {
            const resolved = {
              asset: balance.asset,
              qty: +balance.free + +balance.locked,
              val: { price: '1' }
            }

            resolve(resolved)
          })
        }
      })

    const resBalancesWithPrice = await Promise.all(balances)

    const finalAssets = resBalancesWithPrice
      .filter((r) => {
        if (!r || !r.qty || blackListAssets.includes(r.asset)) {
          return false
        }
        return true
      })
      .map((r) => {
        let price = r?.val.price && +r?.val.price
        if (!price) {
          price = 0
        }

        return {
          asset: r?.asset || 'noAsset',
          qty: r?.qty || 0,
          price,
          total: (r?.qty && r.qty * (price || 0)) || 0
        }
      })

    console.log('🚀 ~ finalAssets ~ finalAssets:', finalAssets)
  } catch (error) {
    console.log('🚀 ~ error:', error)
  }
}

// spot.userAsset().then((res) => {
//   console.log(res)
// })

binanceFun()
