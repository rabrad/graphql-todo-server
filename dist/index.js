"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const TodoResolver_1 = require("./resolvers/TodoResolver");
async function bootstrap() {
    await typeorm_1.createConnection();
    const schema = await type_graphql_1.buildSchema({ resolvers: [TodoResolver_1.TodoResolver] });
    const server = new apollo_server_1.ApolloServer({ schema, playground: true });
    const { url } = await server.listen(4000);
    console.log(`Server is running :)  - GraphQl playground available at: ${url}`);
}
bootstrap();
