import prisma from '../prismaInstance'

import { AllCategories } from '../constancies'

export const createOrUpdateAllCategories = async (
  allCategories: AllCategories
) => {
  try {
    await prisma.mainCategory.deleteMany()
    await prisma.subCategory.deleteMany()

    allCategories.forEach(async (mainCategory) => {
      const mainCategoryResult = await prisma.mainCategory.upsert({
        where: {
          name: mainCategory.name
        },
        update: {
          name: mainCategory.name
        },
        create: {
          name: mainCategory.name
        }
      })
      mainCategory.subCategories.forEach(async (subCategory) => {
        await prisma.subCategory.upsert({
          where: {
            name: subCategory
          },
          update: {
            name: subCategory
          },
          create: {
            name: subCategory
          }
        })

        await prisma.subCategory.update({
          where: { name: subCategory },
          data: {
            mainCategory: {
              connect: { id: mainCategoryResult.id }
            }
          }
        })
      })
    })

    await prisma.$disconnect()
  } catch (error) {
    console.log('🚀 ~ file: createOrUpdateAllCategories.ts:50 ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}
