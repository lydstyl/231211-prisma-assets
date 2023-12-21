import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export type GetAssets = ({
  accountRows: ({
    account: {
      name: string
    }
  } & {
    id: number
    qty: number
    assetId: number
    accountId: number
  })[]

  subCategory:
    | ({
        mainCategory: {
          name: string
        } | null
      } & {
        id: number
        name: string
        mainCategoryId: number | null
      })
    | null
} & {} & {
  id: number
  name: string
  sourceId: string | null
  sourceName: string | null
  price: number
  subCategoryId: number | null
})[]

export async function getAccounts() {
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

    return data
  } catch (error) {
    console.log('🚀 ~ file: getAccounts.ts:65 ~ runGetAccounts ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export const getAssets = async () => {
  try {
    const data = await prisma.asset.findMany({
      include: {
        accountRows: {
          include: { account: { select: { name: true } } }
        },
        subCategory: { include: { mainCategory: { select: { name: true } } } }
      }
    })

    await prisma.$disconnect()
    return data
  } catch (error) {
    await prisma.$disconnect()
    console.log('🚀 ~ file: getAccounts.ts:74 ~ getAssets ~ error:', error)
    process.exit(1)
  }
}

// runGetAccounts()
