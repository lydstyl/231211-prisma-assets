import prisma from '../prismaInstance'

export const getAccountRows = async () => {
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

export default getAccountRows
