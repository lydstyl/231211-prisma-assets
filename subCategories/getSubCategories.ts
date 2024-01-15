import { PrismaClient } from '@prisma/client'

export const getSubCategories = async () => {
  const prisma = new PrismaClient()
  try {
    const res = await prisma.subCategory.findMany()
    await prisma.$disconnect()
    return res
  } catch (error) {
    console.log('🚀 ~ getSubCategories ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default getSubCategories
