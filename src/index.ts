import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'

import { TodoResolver } from './resolvers/TodoResolver'

async function bootstrap() {
  await createConnection()
  const schema = await buildSchema({ resolvers: [TodoResolver] })
  const server = new ApolloServer({ schema, playground: true })

  const { url } = await server.listen(4000)
  console.log(`Server is running :)  - GraphQl playground available at: ${url}`)
}

bootstrap()
