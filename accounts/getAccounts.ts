import { PrismaClient } from '@prisma/client'

export const getAccounts = async () => {
  const prisma = new PrismaClient()
  try {
    const accounts = await prisma.account.findMany()
    await prisma.$disconnect()
    return accounts
  } catch (error) {
    console.log(
      '🚀 ~ file: createOrUpdateAssetsFromDegiro.ts:63 ~ findAccountId ~ error:',
      error
    )
    await prisma.$disconnect()
    process.exit(1)
  }
}

export default getAccounts
