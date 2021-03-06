import { ObjectId } from "mongodb";
import { User } from "../../db/user.db";
import AppContext from "../context";
import { ensureAuthenticated } from "../Guards/authGuard";

/**
 * The arguments for the `createUser` mutation.
 */
type CreateUserArgs = {
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
     * A resolver to query for the current logged in user, determined through the `authentication` header's token.
     * @param parent the parent element for this query
     * @param args the query arguments, nothing in this case
     * @param context the app context
     *
     * @returns the current user if all pre-requisite information has been provided, notably a valid JWT token in the HTTP header
     */
    async currentUser(
      parent: undefined,
      args: {},
      context: AppContext
    ): Promise<User<any> | null> {
      ensureAuthenticated(context);

      return Promise.resolve(context.currentUser);
    },

    // todo: lock down or disable resolvers, add an admin role that can access them

    /**
     * A resolver to query for all users.
     * @param parent the parent element for this query
     * @param args the query arguments, nothing in this case
     * @param context the app context
     *
     * @returns the list of all users in the database
     */
    async users(
      parent: undefined,
      args: {},
      context: AppContext
    ): Promise<User<any>[]> {
      return await context.userDB.getUsers();
    },

    /**
     * A resolver to query a specific user by their unique email address.
     * @param parent the parent element for this query
     * @param args the query arguments, including the email
     * @param context the app context
     *
     * @returns either the user with corresponding email if it exists, or null
     */
    async userByEmail(
      parent: undefined,
      args: { email: string },
      context: AppContext
    ): Promise<User<any> | null> {
      return context.userDB.getUserByEmail(args.email);
    },

    /**
     * A resolver to query a specific user by their unique ID.
     * @param parent the parent element for this query
     * @param args the query arguments, including the ID
     * @param context the app context
     *
     * @returns either the user with corresponding ID if it exists, or null
     */
    async userByID(
      parent: undefined,
      args: { id: string },
      context: AppContext
    ): Promise<User<any> | null> {
      return context.userDB.getUserByID(new ObjectId(args.id));
    },
  },

  Mutation: {
    /**
     * A resolver to create a new user only if their new email address has not already been claimed.
     *
     * @param parent the parent element for this mutation
     * @param args the mutation arguments, including the new user object
     * @param context the app context
     *
     * @returns either the user output object if the user was created successfully, or null if that email was already claimed
     */
    async createUser(
      parent: undefined,
      args: CreateUserArgs,
      context: AppContext
    ): Promise<User<any> | null> {
      return context.userDB.createUser(
        args.email,
        args.fullName,
        args.prefName
      );
    },
  },
};

export default userResolvers;
