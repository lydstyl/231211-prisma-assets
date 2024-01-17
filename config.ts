import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
dotenv.config()

type Environments = {
  test: Environment
  dev: Environment
  production: Environment
}

type Environment = {
  envName: string
}

// Container for environments
const environments: Environments = {
  test: {
    envName: 'test'
  },
  dev: {
    envName: 'development'
  },
  production: {
    envName: 'production'
  }
}

let currEnvironment: Environment

if (process.env.NODE_ENV === 'test') {
  currEnvironment = environments.test
} else if (process.env.NODE_ENV === 'dev') {
  currEnvironment = environments.dev
} else {
  currEnvironment = environments.production
}

// Export environments module
export default currEnvironment
