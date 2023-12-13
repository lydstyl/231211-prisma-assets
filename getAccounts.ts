import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getAccounts() {
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
  return data
}

export const runGetAccounts = async () => {
  try {
    const data = await getAccounts()
    await prisma.$disconnect()
    console.dir(data, { depth: null })
  } catch (error) {
    console.log('🚀 ~ file: 2updateDegiroInDB.ts:69 ~ xxx ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

// runGetAccounts()
