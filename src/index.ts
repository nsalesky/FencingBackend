import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./graphql/schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import dotenv from "dotenv";
import InMemoryUserDB from "./db/imdb/imUser.db";
import config from "./config";
import { connectToDatabase } from "./db/mongo/mongo";
import { UserMongoDB } from "./db/mongo/user.mongo";
import path from "path/posix";

/**
 * Starts the GraphQL server on a port specified in the .env file
 */
async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Setup the database connections
  const collections = await connectToDatabase();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: {
      userDB: new UserMongoDB(collections.usersCollection),
    },
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: config.Port() }, resolve)
  );

  console.log(
    `🚀 Server ready at http://localhost:${config.Port()}${server.graphqlPath}`
  );
}

dotenv.config();
startApolloServer();
