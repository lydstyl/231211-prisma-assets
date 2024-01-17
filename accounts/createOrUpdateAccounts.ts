import prisma from '../prismaInstance'

export const createOrUpdateAccounts = async (accounts: string[]) => {
  console.log(
    '🚀 ~ file: createOrUpdateAccounts.ts:2 ~ createOrUpdateAccounts ~ accounts:',
    accounts
  )

  accounts.forEach(async (accountName) => {
    const upsertAsset = await prisma.account.upsert({
      where: {
        // name: {
        //     contains: accountName,
        //     mode: 'insensitive'
        // }
        name: accountName
      },
      update: {
        name: accountName
      },
      create: {
        name: accountName
      }
    })
  })
}
