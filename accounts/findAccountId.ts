import { PrismaClient } from '@prisma/client'

export const findAccountId = async (accountName: string) => {
  const prisma = new PrismaClient()
  try {
    const account = await prisma.account.findFirst({
      where: {
        name: accountName
      }
    })
    await prisma.$disconnect()
    return account?.id
  } catch (error) {
    console.log(
      '🚀 ~ file: createOrUpdateAssetsFromDegiro.ts:63 ~ findAccountId ~ error:',
      error
    )
    await prisma.$disconnect()
    process.exit(1)
  }
}
