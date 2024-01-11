import dotenv from 'dotenv'
import { Spot } from '@binance/connector-typescript'
dotenv.config()

const BASE_URL = 'https://api.binance.com'

// const client = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL })
// client
//   .exchangeInformation()
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

const spot = new Spot(
  process.env.BINANCE_API_KEY,
  process.env.BINANCE_API_SECRET
).accountInformation()
spot.then((res) => {
  console.log(
    res.balances.filter((balance) => {
      const haveFree = +balance.free > 0.0002
      const haveLocked = +balance.locked > 0.0002

      const haveFreeOrLocked = haveFree || haveLocked

      if (haveFreeOrLocked) {
        return balance
      }
    })
  )
})
