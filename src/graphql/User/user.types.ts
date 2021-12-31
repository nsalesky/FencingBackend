import { gql } from "apollo-server-core";

/**
 * The GraphQL types needed to query and mutate User data.
 */
const userTypes = gql`
  extend type Query {
    users: [User]!
    user(email: String!): User
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
    email: String!
    fullName: String!
    prefName: String!
  }
`;

export default userTypes;
