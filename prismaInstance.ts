import { PrismaClient } from '@prisma/client'

import currEnvironment from './config'

if (currEnvironment.envName === 'test') {
  var prisma = new PrismaClient()

  //   //https://www.prisma.io/docs/orm/reference/prisma-client-reference#datasources
  //   var prisma = new PrismaClient({
  //     datasources: {
  //       db: {
  //         url: 'file:./test.db'
  //       }
  //     }
  //   })
} else {
  var prisma = new PrismaClient()
}
export default prisma
