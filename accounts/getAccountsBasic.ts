import prisma from '../prismaInstance'

export const getAccountsBasic = async () => {
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

export default getAccountsBasic
