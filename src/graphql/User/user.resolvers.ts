import { GraphQLResolveInfo } from "graphql";
import AppContext from "../context";

type UsersArgs = {};
type UserArgs = { email: string };

const userResolvers = {
  Query: {
    users(
      parent: undefined,
      args: UsersArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ) {},

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
