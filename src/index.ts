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
import AppContext from "./graphql/context";
import { ObjectId } from "mongodb";
import { User } from "./db/user.db";

/**
 * Starts the GraphQL server on a port specified in the .env file
 */
async function startApolloServer() {
  dotenv.config();
  const app = express();
  const httpServer = http.createServer(app);

  // Setup the database connections
  const collections = await connectToDatabase();
  let userDB = new UserMongoDB(collections.usersCollection);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }): Promise<AppContext> => {
      let authToken: string = "";
      let currentUser: User<ObjectId> | undefined = undefined;

      try {
        authToken = (req.headers[config.AuthHeaderName()] as string) || "";

        if (authToken) {
          // There was some token in the headers
          currentUser = await userDB.tradeTokenForUser(authToken);
        }
      } catch (e) {
        console.warn(
          `Unable to authenticate user using authentication token: ${authToken}`
        );
      }

      return {
        userDB,
        authToken,
        currentUser,
      };
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

startApolloServer();
