import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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