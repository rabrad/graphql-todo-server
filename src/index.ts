import 'reflect-metadata'
import dotenv from 'dotenv'
import express from 'express'
import {createConnection} from 'typeorm'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'

import {TodoResolver} from './resolvers/TodoResolver'

dotenv.config()

async function bootstrap() {
  const app = express()
  await createConnection()
  const schema = await buildSchema({resolvers: [TodoResolver]})
  const server = new ApolloServer({schema, playground: true})
  server.applyMiddleware({app})

  app.listen(4000, () => {
    console.log(`Server is running :)  - GraphQl playground available at: ${server.graphqlPath}`)
  })
}

bootstrap()
