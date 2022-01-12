import { gql } from "apollo-server-core";
import { merge } from "lodash";
import { dateScalar } from "./scalars";
import tournamentResolvers from "./Tournament/tournament.resolvers";
import tournamentTypes from "./Tournament/tournament.types";
import userResolvers from "./User/user.resolvers";
import userTypes from "./User/user.types";

/**
 * A basic root query because we need at least one field
 */
const Query = gql`
  type Query {
    _empty: String
  }
`;

/**
 * A basic root mutation because we need at least one field
 */
const Mutation = gql`
  type Mutation {
    _empty: String
  }
`;

/**
 * Basic type definitions containing common custom scalar types.
 */
const baseTypeDefs = gql`
  scalar Date
`;

// The GraphQL type definitions for all types
const typeDefs = [Query, Mutation, baseTypeDefs, userTypes, tournamentTypes];

// Any basic resolvers that aren't tied to a particular type can go here
const baseResolvers = {
  // Introduces the custom Date type
  Date: dateScalar,
};

// All of the GraphQL resolvers
const resolvers = merge(baseResolvers, userResolvers, tournamentResolvers);

export { typeDefs, resolvers };
