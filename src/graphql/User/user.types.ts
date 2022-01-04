import { gql } from "apollo-server-core";

/**
 * The GraphQL types needed to query and mutate User data.
 */
const userTypes = gql`
  extend type Query {
    users: [User]!
    userByEmail(email: String!): User
    userByID(id: ID!): User
  }

  extend type Mutation {
    createUser(user: NewUser!): User
  }

  input NewUser {
    email: String!
    fullName: String!
    prefName: String!
  }

  type User {
    id: ID!
    email: String!
    fullName: String!
    prefName: String!
  }
`;

export default userTypes;
