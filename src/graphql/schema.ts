import { gql } from "apollo-server-core";
import { merge } from "lodash";
import userResolvers from "./User/user.resolvers";
import userTypes from "./User/user.types";

// A basic root query because we need at least one field
const Query = gql`
  type Query {
    _empty: String
  }
`;

// A basic root mutation because we need at least one field
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

// The GraphQL type definitions for all types
const typeDefs = [Query, Mutation, userTypes];

// Any basic resolvers that aren't tied to a particular type can go here
const baseResolvers = {};

// All of the GraphQL resolvers
const resolvers = merge(baseResolvers, userResolvers);

export { typeDefs, resolvers };
