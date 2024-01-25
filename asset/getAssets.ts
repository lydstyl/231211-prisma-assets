import prisma from '../prismaInstance'

export const getAssets = async () => {
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
export const getAssets2 = async () => {
  try {
    const res = await prisma.asset.findMany({ include: { accountRows: true } })
    await prisma.$disconnect()
    return res
  } catch (error) {
    console.log('🚀 ~ getAssets ~ error:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default getAssets
