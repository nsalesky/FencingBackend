import { GraphQLResolveInfo } from "graphql";
import AppContext from "../context";

// todo: try to figure out the types for this function and better understand exactly what it's doing
/**
 * Wraps a GraphQL resolver to only execute it if a `currentUser` exists in `context` from the authentication token.
 * @param next the wrapped resolver to execute if `currentUser` is not undefined
 * @returns whatever that resolver returns
 * @throws Error if `context.currentUser` is undefined
 */
export const authenticated =
  (next: any) =>
  (
    root: undefined,
    args: any,
    context: AppContext,
    info: GraphQLResolveInfo
  ) => {
    if (!context.currentUser) {
      throw new Error(
        "User must be authenticated in order to access this GraphQL endpoint!"
      );
    }

    return next(root, args, context, info);
  };
