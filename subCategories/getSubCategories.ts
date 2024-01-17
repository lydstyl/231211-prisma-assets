import prisma from '../prismaInstance'

export const getSubCategories = async () => {
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
