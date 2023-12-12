import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// UPDATE DB
// use degiroCsvParser to update Degiro assets
// remove all Degiro account rows
// add new Degiro account rows

// UPDATE DB
// do the same with PEACsvParser

// UPDATE DB
// optional or later do the same with bitstampDBUpdater

// UPDATE DB
// optional or later do the same with binanceDBUpdater

// UPDATE DB
// do the same with manualDBUpdater for other assets (make sur all accounts from cash vision are done)

// EXTRACT DATA FROM DB
// in a new file get patrimony data
// in an other file make a patrimony csv export
// make a CSV with all assets by categories

// EXTRACT DATA FROM DB
// make a CSV with all assets by account with all data

// check total is equal to cash vision
// Create donuts

async function main() {
  //   const users = await prisma.user.findMany()
  //   console.log('🚀 ~ file: script.ts:14 ~ main ~ users:', users)
  //   const user = await prisma.user.create({
  //     data: {
  //       name: 'Bob',
  //       email: 'bob@prisma.io',
  //       posts: {
  //         create: {
  //           title: 'Hello World'
  //         }
  //       }
  //     }
  //   })
  //   const usersWithPosts = await prisma.user.findMany({
  //     include: {
  //       posts: true
  //     },
  //     where: { id: 1 }
  //   })
  //   console.dir(usersWithPosts, { depth: null })

  ////////////////
  //   const asset = await prisma.mainCat.create({
  //     data: {
  //       name: 'bourse'
  //     }
  //   })

  const data = await prisma.account.findMany({
    include: {
      accountRows: {
        include: {
          asset: {
            include: {
              subCategory: {
                include: {
                  mainCategory: {}
                }
              }
            }
          }
        }
      }
    }
  })
  console.dir(data, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
