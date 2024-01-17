import prisma from '../prismaInstance'

export const getMainCategories = async () => {
  try {
    const res = await prisma.mainCategory.findMany()
    await prisma.$disconnect()
    return res
  } catch (error) {
    console.log('🚀 ~ getMainCategories ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default getMainCategories
