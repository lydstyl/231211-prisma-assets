import { createCSV } from './makeCSVWithAllAssets'

// ### user login
// POST http://localhost:5000/api/v1/login
// content-type: application/json

// {
//     "email": "lydstyl@gmail.com",
//     "password": "9nUF68rbYWZRSq7"
// }

// ###
// GET http://localhost:5000/api/v1/accounts
// Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoibHlkc3R5bEBnbWFpbC5jb20iLCJpYXQiOjE3MDI2NTk3NzQsImV4cCI6MTcwMjY2MzM3NH0.bK6yvccr5_GbH81U33ORxmv_ETCpvV5IxOlKUtpdPCg

const accountsFromCashVision = [
  {
    id: 24,
    name: 'Raismes',
    amount: 175386,
    createdAt: '2023-11-28T22:33:47.561Z',
    updatedAt: '2023-12-09T15:26:00.783Z',
    userId: 1,
    moments: [
      {
        id: 41,
        amount: 175386,
        createdAt: '2023-12-09T15:26:00.795Z',
        updatedAt: '2023-12-09T15:26:00.795Z',
        accountId: 24
      },
      {
        id: 33,
        amount: 175387,
        createdAt: '2023-12-09T15:20:57.336Z',
        updatedAt: '2023-12-09T15:20:57.336Z',
        accountId: 24
      },
      {
        id: 26,
        amount: 200251,
        createdAt: '2023-11-28T22:33:54.985Z',
        updatedAt: '2023-11-28T22:33:54.985Z',
        accountId: 24
      }
    ]
  },
  {
    id: 25,
    name: 'Roubaix',
    amount: 90970,
    createdAt: '2023-11-28T22:34:02.660Z',
    updatedAt: '2023-12-09T15:18:31.886Z',
    userId: 1,
    moments: [
      {
        id: 27,
        amount: 82372,
        createdAt: '2023-11-28T22:34:11.359Z',
        updatedAt: '2023-11-28T22:34:11.359Z',
        accountId: 25
      },
      {
        id: 31,
        amount: 90970,
        createdAt: '2023-12-09T15:18:31.905Z',
        updatedAt: '2023-12-09T15:18:31.905Z',
        accountId: 25
      }
    ]
  },
  {
    id: 29,
    name: 'Les ledgers (Ledger Live)',
    amount: 63887,
    createdAt: '2023-12-09T15:33:01.592Z',
    updatedAt: '2023-12-09T15:33:26.940Z',
    userId: 1,
    moments: [
      {
        id: 44,
        amount: 63887,
        createdAt: '2023-12-09T15:33:26.954Z',
        updatedAt: '2023-12-09T15:33:26.954Z',
        accountId: 29
      }
    ]
  },
  {
    id: 27,
    name: 'St Amand',
    amount: 61941,
    createdAt: '2023-11-28T22:34:38.471Z',
    updatedAt: '2023-12-09T15:20:11.841Z',
    userId: 1,
    moments: [
      {
        id: 32,
        amount: 61941,
        createdAt: '2023-12-09T15:20:11.855Z',
        updatedAt: '2023-12-09T15:20:11.855Z',
        accountId: 27
      },
      {
        id: 29,
        amount: 65900,
        createdAt: '2023-11-28T22:34:45.705Z',
        updatedAt: '2023-11-28T22:34:45.705Z',
        accountId: 27
      }
    ]
  },
  {
    id: 1,
    name: 'Binance',
    amount: 37920,
    createdAt: '2023-11-28T21:27:05.736Z',
    updatedAt: '2023-12-09T15:30:15.761Z',
    userId: 1,
    moments: [
      {
        id: 1,
        amount: 21450,
        createdAt: '2023-11-28T21:27:17.357Z',
        updatedAt: '2023-11-28T21:27:17.357Z',
        accountId: 1
      },
      {
        id: 42,
        amount: 37920,
        createdAt: '2023-12-09T15:30:15.771Z',
        updatedAt: '2023-12-09T15:30:15.771Z',
        accountId: 1
      }
    ]
  },
  {
    id: 21,
    name: 'PEA Titres',
    amount: 34102,
    createdAt: '2023-11-28T22:31:44.788Z',
    updatedAt: '2023-12-09T15:23:07.273Z',
    userId: 1,
    moments: [
      {
        id: 34,
        amount: 34102,
        createdAt: '2023-12-09T15:23:07.287Z',
        updatedAt: '2023-12-09T15:23:07.287Z',
        accountId: 21
      },
      {
        id: 23,
        amount: 36928,
        createdAt: '2023-11-28T22:32:27.309Z',
        updatedAt: '2023-11-28T22:32:27.309Z',
        accountId: 21
      }
    ]
  },
  {
    id: 11,
    name: 'Immeuble (remboursé)',
    amount: 27465,
    createdAt: '2023-11-28T22:27:12.461Z',
    updatedAt: '2023-12-09T15:37:21.714Z',
    userId: 1,
    moments: [
      {
        id: 12,
        amount: 11913,
        createdAt: '2023-11-28T22:27:29.150Z',
        updatedAt: '2023-11-28T22:27:29.150Z',
        accountId: 11
      },
      {
        id: 47,
        amount: 27465,
        createdAt: '2023-12-09T15:37:21.726Z',
        updatedAt: '2023-12-09T15:37:21.726Z',
        accountId: 11
      }
    ]
  },
  {
    id: 2,
    name: 'Bitstamp',
    amount: 22538,
    createdAt: '2023-11-28T22:14:06.576Z',
    updatedAt: '2023-12-09T16:16:29.669Z',
    userId: 1,
    moments: [
      {
        id: 2,
        amount: 13013,
        createdAt: '2023-11-28T22:14:19.201Z',
        updatedAt: '2023-11-28T22:14:19.201Z',
        accountId: 2
      },
      {
        id: 61,
        amount: 22538,
        createdAt: '2023-12-09T16:16:29.683Z',
        updatedAt: '2023-12-09T16:16:29.683Z',
        accountId: 2
      }
    ]
  },
  {
    id: 19,
    name: 'PEA espèce',
    amount: 20611,
    createdAt: '2023-11-28T22:31:08.172Z',
    updatedAt: '2023-12-09T15:23:32.629Z',
    userId: 1,
    moments: [
      {
        id: 21,
        amount: 16055,
        createdAt: '2023-11-28T22:31:16.581Z',
        updatedAt: '2023-11-28T22:31:16.581Z',
        accountId: 19
      },
      {
        id: 35,
        amount: 20611,
        createdAt: '2023-12-09T15:23:32.641Z',
        updatedAt: '2023-12-09T15:23:32.641Z',
        accountId: 19
      }
    ]
  },
  {
    id: 9,
    name: 'Degiro',
    amount: 20186,
    createdAt: '2023-11-28T22:26:39.288Z',
    updatedAt: '2023-12-09T15:31:08.458Z',
    userId: 1,
    moments: [
      {
        id: 43,
        amount: 20186,
        createdAt: '2023-12-09T15:31:08.472Z',
        updatedAt: '2023-12-09T15:31:08.472Z',
        accountId: 9
      },
      {
        id: 10,
        amount: 21251,
        createdAt: '2023-11-28T22:26:46.933Z',
        updatedAt: '2023-11-28T22:26:46.933Z',
        accountId: 9
      }
    ]
  },
  {
    id: 23,
    name: 'Poloniex',
    amount: 17024,
    createdAt: '2023-11-28T22:33:05.601Z',
    updatedAt: '2023-12-09T15:35:02.626Z',
    userId: 1,
    moments: [
      {
        id: 25,
        amount: 16102,
        createdAt: '2023-11-28T22:33:38.173Z',
        updatedAt: '2023-11-28T22:33:38.173Z',
        accountId: 23
      },
      {
        id: 45,
        amount: 17024,
        createdAt: '2023-12-09T15:35:02.639Z',
        updatedAt: '2023-12-09T15:35:02.639Z',
        accountId: 23
      }
    ]
  },
  {
    id: 26,
    name: 'SCI',
    amount: 12992,
    createdAt: '2023-11-28T22:34:20.937Z',
    updatedAt: '2023-12-09T15:35:48.322Z',
    userId: 1,
    moments: [
      {
        id: 46,
        amount: 12992,
        createdAt: '2023-12-09T15:35:48.340Z',
        updatedAt: '2023-12-09T15:35:48.340Z',
        accountId: 26
      },
      {
        id: 28,
        amount: 13424,
        createdAt: '2023-11-28T22:34:30.152Z',
        updatedAt: '2023-11-28T22:34:30.152Z',
        accountId: 26
      }
    ]
  },
  {
    id: 16,
    name: 'Livret A',
    amount: 12000,
    createdAt: '2023-11-28T22:29:43.019Z',
    updatedAt: '2023-12-09T15:24:29.535Z',
    userId: 1,
    moments: [
      {
        id: 18,
        amount: 6847,
        createdAt: '2023-11-28T22:29:50.531Z',
        updatedAt: '2023-11-28T22:29:50.531Z',
        accountId: 16
      },
      {
        id: 39,
        amount: 12000,
        createdAt: '2023-12-09T15:24:29.549Z',
        updatedAt: '2023-12-09T15:24:29.549Z',
        accountId: 16
      }
    ]
  },
  {
    id: 17,
    name: 'MACSF',
    amount: 11897,
    createdAt: '2023-11-28T22:30:02.605Z',
    updatedAt: '2023-12-09T16:18:47.185Z',
    userId: 1,
    moments: [
      {
        id: 62,
        amount: 11897,
        createdAt: '2023-12-09T16:18:47.199Z',
        updatedAt: '2023-12-09T16:18:47.199Z',
        accountId: 17
      },
      {
        id: 19,
        amount: 12035,
        createdAt: '2023-11-28T22:30:37.703Z',
        updatedAt: '2023-11-28T22:30:37.703Z',
        accountId: 17
      }
    ]
  },
  {
    id: 7,
    name: 'CA Freelance',
    amount: 4028,
    createdAt: '2023-11-28T22:22:55.270Z',
    updatedAt: '2023-12-09T15:44:51.919Z',
    userId: 1,
    moments: [
      {
        id: 8,
        amount: 1288,
        createdAt: '2023-11-28T22:23:08.673Z',
        updatedAt: '2023-11-28T22:23:08.673Z',
        accountId: 7
      },
      {
        id: 50,
        amount: 4028,
        createdAt: '2023-12-09T15:44:51.933Z',
        updatedAt: '2023-12-09T15:44:51.933Z',
        accountId: 7
      }
    ]
  },
  {
    id: 5,
    name: 'BNP Perso',
    amount: 2846,
    createdAt: '2023-11-28T22:16:55.268Z',
    updatedAt: '2023-12-09T15:24:51.067Z',
    userId: 1,
    moments: [
      {
        id: 40,
        amount: 2846,
        createdAt: '2023-12-09T15:24:51.079Z',
        updatedAt: '2023-12-09T15:24:51.079Z',
        accountId: 5
      },
      {
        id: 5,
        amount: 4164,
        createdAt: '2023-11-28T22:17:01.667Z',
        updatedAt: '2023-11-28T22:17:01.667Z',
        accountId: 5
      }
    ]
  },
  {
    id: 18,
    name: 'Mutavie',
    amount: 2066,
    createdAt: '2023-11-28T22:30:49.489Z',
    updatedAt: '2023-12-09T15:44:08.663Z',
    userId: 1,
    moments: [
      {
        id: 20,
        amount: 2039,
        createdAt: '2023-11-28T22:30:55.164Z',
        updatedAt: '2023-11-28T22:30:55.164Z',
        accountId: 18
      },
      {
        id: 49,
        amount: 2066,
        createdAt: '2023-12-09T15:44:08.676Z',
        updatedAt: '2023-12-09T15:44:08.676Z',
        accountId: 18
      }
    ]
  },
  {
    id: 28,
    name: 'Tableau Laporte',
    amount: 800,
    createdAt: '2023-11-28T22:34:54.808Z',
    updatedAt: '2023-12-09T15:50:39.469Z',
    userId: 1,
    moments: [
      {
        id: 30,
        amount: 800,
        createdAt: '2023-11-28T22:35:00.948Z',
        updatedAt: '2023-11-28T22:35:00.948Z',
        accountId: 28
      },
      {
        id: 52,
        amount: 800,
        createdAt: '2023-12-09T15:50:39.482Z',
        updatedAt: '2023-12-09T15:50:39.482Z',
        accountId: 28
      },
      {
        id: 51,
        amount: 801,
        createdAt: '2023-12-09T15:50:35.951Z',
        updatedAt: '2023-12-09T15:50:35.951Z',
        accountId: 28
      }
    ]
  },
  {
    id: 6,
    name: 'Boursorama',
    amount: 470,
    createdAt: '2023-11-28T22:17:32.635Z',
    updatedAt: '2023-12-09T16:04:06.869Z',
    userId: 1,
    moments: [
      {
        id: 53,
        amount: 470,
        createdAt: '2023-12-09T16:04:06.885Z',
        updatedAt: '2023-12-09T16:04:06.885Z',
        accountId: 6
      },
      {
        id: 6,
        amount: 471.95,
        createdAt: '2023-11-28T22:17:52.315Z',
        updatedAt: '2023-11-28T22:17:52.315Z',
        accountId: 6
      },
      {
        id: 7,
        amount: 471.95,
        createdAt: '2023-11-28T22:19:37.977Z',
        updatedAt: '2023-11-28T22:19:37.977Z',
        accountId: 6
      }
    ]
  },
  {
    id: 4,
    name: 'Bittrex',
    amount: 224,
    createdAt: '2023-11-28T22:14:42.582Z',
    updatedAt: '2023-12-09T15:38:14.319Z',
    userId: 1,
    moments: [
      {
        id: 48,
        amount: 224,
        createdAt: '2023-12-09T15:38:14.333Z',
        updatedAt: '2023-12-09T15:38:14.333Z',
        accountId: 4
      },
      {
        id: 4,
        amount: 5511,
        createdAt: '2023-11-28T22:14:52.088Z',
        updatedAt: '2023-11-28T22:14:52.088Z',
        accountId: 4
      }
    ]
  },
  {
    id: 10,
    name: 'Etoro',
    amount: 128,
    createdAt: '2023-11-28T22:26:54.919Z',
    updatedAt: '2023-12-09T16:07:52.694Z',
    userId: 1,
    moments: [
      {
        id: 55,
        amount: 127,
        createdAt: '2023-12-09T16:07:48.825Z',
        updatedAt: '2023-12-09T16:07:48.825Z',
        accountId: 10
      },
      {
        id: 11,
        amount: 128,
        createdAt: '2023-11-28T22:27:00.035Z',
        updatedAt: '2023-11-28T22:27:00.035Z',
        accountId: 10
      },
      {
        id: 56,
        amount: 128,
        createdAt: '2023-12-09T16:07:52.708Z',
        updatedAt: '2023-12-09T16:07:52.708Z',
        accountId: 10
      }
    ]
  },
  {
    id: 8,
    name: 'Capgemini',
    amount: 52,
    createdAt: '2023-11-28T22:23:44.543Z',
    updatedAt: '2023-12-09T16:08:45.409Z',
    userId: 1,
    moments: [
      {
        id: 58,
        amount: 51,
        createdAt: '2023-12-09T16:08:41.126Z',
        updatedAt: '2023-12-09T16:08:41.126Z',
        accountId: 8
      },
      {
        id: 9,
        amount: 52,
        createdAt: '2023-11-28T22:25:03.442Z',
        updatedAt: '2023-11-28T22:25:03.442Z',
        accountId: 8
      },
      {
        id: 59,
        amount: 52,
        createdAt: '2023-12-09T16:08:45.422Z',
        updatedAt: '2023-12-09T16:08:45.422Z',
        accountId: 8
      }
    ]
  },
  {
    id: 20,
    name: 'PEA PME espèce',
    amount: 15,
    createdAt: '2023-11-28T22:31:28.212Z',
    updatedAt: '2023-12-09T15:23:47.682Z',
    userId: 1,
    moments: [
      {
        id: 36,
        amount: 14,
        createdAt: '2023-12-09T15:23:44.211Z',
        updatedAt: '2023-12-09T15:23:44.211Z',
        accountId: 20
      },
      {
        id: 22,
        amount: 15,
        createdAt: '2023-11-28T22:31:32.595Z',
        updatedAt: '2023-11-28T22:31:32.595Z',
        accountId: 20
      },
      {
        id: 37,
        amount: 15,
        createdAt: '2023-12-09T15:23:47.694Z',
        updatedAt: '2023-12-09T15:23:47.694Z',
        accountId: 20
      }
    ]
  },
  {
    id: 15,
    name: 'Liquide',
    amount: 15,
    createdAt: '2023-11-28T22:29:12.099Z',
    updatedAt: '2023-12-09T16:06:41.766Z',
    userId: 1,
    moments: [
      {
        id: 54,
        amount: 15,
        createdAt: '2023-12-09T16:06:41.779Z',
        updatedAt: '2023-12-09T16:06:41.779Z',
        accountId: 15
      },
      {
        id: 16,
        amount: 450,
        createdAt: '2023-11-28T22:29:17.354Z',
        updatedAt: '2023-11-28T22:29:17.354Z',
        accountId: 15
      },
      {
        id: 17,
        amount: 450,
        createdAt: '2023-11-28T22:29:35.489Z',
        updatedAt: '2023-11-28T22:29:35.489Z',
        accountId: 15
      }
    ]
  },
  {
    id: 3,
    name: 'BitPay',
    amount: 1,
    createdAt: '2023-11-28T22:14:27.745Z',
    updatedAt: '2023-12-09T16:08:56.100Z',
    userId: 1,
    moments: [
      {
        id: 60,
        amount: 1,
        createdAt: '2023-12-09T16:08:56.113Z',
        updatedAt: '2023-12-09T16:08:56.113Z',
        accountId: 3
      },
      {
        id: 3,
        amount: 1.15,
        createdAt: '2023-11-28T22:14:37.069Z',
        updatedAt: '2023-11-28T22:14:37.069Z',
        accountId: 3
      }
    ]
  }
]

const accountsForCsv = accountsFromCashVision.map((account) => ({
  account: account.name,
  name: 'EUR',
  qty: `${account.amount}`,
  price: '1'
}))
console.log(
  '🚀 ~ file: xxx.ts:652 ~ accountsForCsv ~ accountsForCsv:',
  accountsForCsv
)

createCSV(['account', 'name', 'qty', 'price'], accountsForCsv)
