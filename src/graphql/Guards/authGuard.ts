import { GraphQLResolveInfo } from "graphql";
import AppContext from "../context";

/**
 * Ensures that an authenticated `User` is present in the context. If `context.currentUser` is null, then an error is thrown.
 * @param context the application context potentially containing the authenticated user
 * @throws an error if `context.currentUser === null`, ie user authentication from the `authToken` failed for some reason
 */
export const ensureAuthenticated = (context: AppContext) => {
  if (!context.currentUser) {
    throw new Error(
      "User must be authenticated in order to access this GraphQL endpoint!"
    );
  }
};
