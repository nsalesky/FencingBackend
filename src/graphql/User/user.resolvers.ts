import { GraphQLResolveInfo } from "graphql";
import { User } from "../../db/user.db";
import AppContext from "../context";

/**
 * The empty arguments for the `users` query.
 */
type UsersArgs = {};

/**
 * The arguments for the `userByEmail` query, a single unique email address.
 */
type UserEmailArgs = { email: string };

/**
 * The arguments for the `userByID` query, a single unique ID.
 */
type UserIDArgs = { id: string };

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
    async users(
      parent: undefined,
      args: UsersArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<User<any>[]> {
      return await context.userDB.getUsers();
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
    async userByEmail(
      parent: undefined,
      args: UserEmailArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<User<any> | undefined> {
      return context.userDB.getUserByEmail(args.email);
    },

    /**
     * A resolver to query a specific user by their unique ID.
     * @param parent the parent element for this query
     * @param args the query arguments, including the ID
     * @param context the app context
     * @param info query info
     *
     * @returns either the user with corresponding ID if it exists, or undefined
     */
    async userByID(
      parent: undefined,
      args: UserIDArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<User<any> | undefined> {
      return context.userDB.getUserByID(args.id);
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
    async createUser(
      parent: undefined,
      args: CreateUserArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<User<any> | undefined> {
      return context.userDB.createUser(
        args.user.email,
        args.user.fullName,
        args.user.prefName
      );
    },
  },
};

export default userResolvers;
