import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql/schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import dotenv from "dotenv";
import InMemoryUserDB from "./db/User/imUser.db";

/**
 * Starts the GraphQL server on a port specified in the .env file
 */
async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: {
      // todo: eventually change to a MongoDB database implementation
      userDB: new InMemoryUserDB(),
    },
  });

  await server.start();

  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

dotenv.config();
startApolloServer();
