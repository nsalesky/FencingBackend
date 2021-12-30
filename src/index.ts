import express from "express";
import http from "http";
import {ApolloServer} from "apollo-server-express";
import {resolvers, typeDefs} from "./graphql/schema";
import {ApolloServerPluginDrainHttpServer} from "apollo-server-core";

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });

  await server.start();

  server.applyMiddleware({app});
  await new Promise<void>(resolve => httpServer.listen({port: 4000}, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
