import prisma from '../prismaInstance'

export const getAccountRowsBasic = async () => {
  try {
    const accountRows = await prisma.accountRow.findMany()
    await prisma.$disconnect()
    return accountRows
  } catch (error) {
    console.log('🚀 ~ getAccountRows ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export type DBAccountRow = {
  asset: {
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
  } & {
    id: number
    name: string
    sourceId: string | null
    sourceName: string | null
    price: number
    subCategoryId: number | null
  }

  account: {
    name: string
  }

  id: number
  qty: number
  assetId: number
  accountId: number
}

export const gatAccountRows = async (): Promise<DBAccountRow[]> => {
  try {
    const data = await prisma.accountRow.findMany({
      //   where: {
      //     asset: {
      //       name: 'BTC' // remove this dev filter
      //     }
      //   },
      include: {
        account: {
          select: { name: true }
        },
        asset: {
          include: {
            subCategory: {
              include: {
                mainCategory: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    await prisma.$disconnect()

    return data
  } catch (error) {
    await prisma.$disconnect()
    console.log(
      '🚀 ~ file: makeCSVWithAllAccountRows.ts:20 ~ gatAccountRows ~ error:',
      error
    )
    process.exit(1)
  }
}

export default getAccountRowsBasic
