import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
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
  // console.dir(data, { depth: null })
  return data
}

export const runMain = async () => {
  try {
    const data = await main()
    await prisma.$disconnect()
    console.dir(data, { depth: null })
  } catch (error) {
    console.log('🚀 ~ file: 2updateDegiroInDB.ts:69 ~ xxx ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}
