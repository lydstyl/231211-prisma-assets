import { PrismaClient } from '@prisma/client'

export const getAssets = async () => {
  const prisma = new PrismaClient()
  try {
    const res = await prisma.asset.findMany()
    await prisma.$disconnect()
    return res
  } catch (error) {
    console.log('🚀 ~ getAssets ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default getAssets
