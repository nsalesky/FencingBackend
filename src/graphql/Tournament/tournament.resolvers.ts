import { GraphQLResolveInfo } from "graphql";
import { Tournament } from "../../db/tournament.db";
import AppContext from "../context";
import { ensureAuthenticated } from "../Guards/authGuard";

/**
 * The arguments for the `createTournament` mutation.
 */
interface CreateTournamentArgs {
  name: string;
  isPrivate: Boolean;
  location: string;
  time: Date;
}

/**
 * The GraphQL resolvers corresponding with the `Tournament` graphql object.
 */
const tournamentResolvers = {
  Query: {
    /**
     * A resolver to query the list of public tournaments after a given date.
     * @param parent the parent element for this query
     * @param args the query arguments
     * @param context the app context
     * @param info query info
     * @returns the list of public tournaments taking place after the given potentially null date
     */
    async publicTournaments(
      parent: undefined,
      args: { afterDate: Date | null },
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<Tournament<any>[]> {
      return await context.tournamentDB.getPublicTournaments(args.afterDate);
    },
  },

  User: {
    /**
     * Gets the list of tournaments managed by the currently authenticated user.
     * @param parent the parent element for this query
     * @param args the query arguments
     * @param context the app context
     * @param info query info
     * @returns the list of tournaments managed by the authenticated user
     * @throws an error if there is no authenticated user
     */
    async managedTournaments(
      parent: undefined,
      args: {},
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<Tournament<any>[]> {
      ensureAuthenticated(context);

      return await context.tournamentDB.getManagedTournaments(
        context.currentUser!.id
      );
    },
  },

  Mutation: {
    /**
     * A resolver to create a new tournament managed by the logged-in user.
     * @param parent the parent element for this mutation
     * @param args the mutation arguments
     * @param context the app context
     * @param info mutation info
     * @returns either the created tournament if successful, or null if it failed
     * @throws an error if the user is not authenticated
     */
    async createTournament(
      parent: undefined,
      args: CreateTournamentArgs,
      context: AppContext,
      info: GraphQLResolveInfo
    ): Promise<Tournament<any> | null> {
      ensureAuthenticated(context);

      return await context.tournamentDB.createTournament(
        args.name,
        context.currentUser!.id,
        args.isPrivate,
        args.location,
        args.time
      );
    },
  },
};

export default tournamentResolvers;