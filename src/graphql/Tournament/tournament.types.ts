import { gql } from "apollo-server-core";

/**
 * The GraphQL types needed to query and mutate `Tournament` data.
 */
const tournamentTypes = gql`
  extend type Query {
    publicTournaments(afterDate: Date): [Tournament!]!
    getTournamentByCode(privateCode: String!): Tournament
  }

  extend type User {
    managedTournaments: [Tournament!]!
  }

  extend type Mutation {
    createTournament(
      name: String!
      isPrivate: Boolean!
      location: String!
      time: Date!
    ): Tournament
  }

  type Tournament {
    id: ID!
    name: String!
    managers: [ID!]!
    privateCode: String
    location: String!
    time: Date!
  }
`;

export default tournamentTypes;
