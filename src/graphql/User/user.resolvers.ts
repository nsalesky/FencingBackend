import { GraphQLResolveInfo } from "graphql";
import { User } from "../../db/User/user.db";
import AppContext from "../context";

/**
 * The empty arguments for the `users` query.
 */
type UsersArgs = {};

/**
 * The arguments for the `user` query, a single unique email address.
 */
type UserArgs = { email: string };

/**
 * The arguments for the `createUser` mutation.
 */
type CreateUserArgs = {
  user: {
    email: string;
    fullName: string;
    prefName: string;
  };
};

/**
 * A User object that can safely be returned by GraphQL resolvers.
 */
type UserOutput = {
  email: string;
  fullName: string;
  prefName: string;
};

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
    ): UserOutput[] {
      let users = context.userDB.getUsers();

      // todo: seems a bit redundant. Is this really necessary for security reasons?
      return users.map((user: User): UserOutput => {
        return {
          email: user.email,
          fullName: user.fullName,
          prefName: user.prefName,
        };
      });
    },

    /**
     * A resolver to query a specific user by their unique email address.
     * @param parent the parent element for this query
     * @param args the query arguments, including the email
     * @param context the app context
     * @param info query info
     *
     * @returns either the user with corresponding email if it exists, or undefined
     */
    user(
      parent: undefined,
      args: UserArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): UserOutput | undefined {
      let user = context.userDB.getUserByEmail(args.email);

      if (user === undefined) {
        return undefined;
      }

      // todo: same as above, is this really necessary?
      return {
        email: user.email,
        fullName: user.fullName,
        prefName: user.prefName,
      };
    },
  },

  Mutation: {
    /**
     * A resolver to create a new user only if their new email address has not already been claimed.
     *
     * @param parent the parent element for this mutation
     * @param args the mutation arguments, including the new user object
     * @param context the app context
     * @param info mutation info
     *
     * @returns either the user output object if the user was created successfully, or undefined if that email was already claimed
     */
    createUser(
      parent: undefined,
      args: CreateUserArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): UserOutput | undefined {
      let newUser = context.userDB.createUser(
        args.user.email,
        args.user.fullName,
        args.user.prefName
      );

      if (newUser === undefined) {
        return undefined;
      }

      // todo: again, is this really necessary?
      return {
        email: newUser.email,
        fullName: newUser.fullName,
        prefName: newUser.prefName,
      };
    },
  },
};

export default userResolvers;
