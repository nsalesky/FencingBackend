import { GraphQLResolveInfo } from "graphql";
import AppContext from "../context";

type UsersArgs = {};
type UserArgs = { email: string };

/**
 * The GraphQL resolvers corresponding to the `User` graphql object.
 */
const userResolvers = {
  Query: {
    /**
     * A resolver to query for all users.
     * @param parent the parent element for this query
     * @param args the query arguments, nothing in this case
     * @param context the app context
     * @param info query info
     *
     * @returns the list of all users in the database
     */
    users(
      parent: undefined,
      args: UsersArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ) {},

    /**
     * A resolver to query a specific user by their unique email address.
     * @param parent the parent element for this query
     * @param args the query arguments, including the email
     * @param context the app context
     * @param info query info
     *
     * @returns either the user with corresponding email if it exists, or null
     */
    user(
      parent: undefined,
      args: UserArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ) {},
  },

  Mutation: {},
};

export default userResolvers;
