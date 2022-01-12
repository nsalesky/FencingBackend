import { ObjectId } from "mongodb";
import { TournamentDatabase } from "../db/tournament.db";
import { User, UserDatabase } from "../db/user.db";

/**
 * The global context that all GraphQL resolvers will share containing the database
 * objects and any other important pieces of state.
 */
interface AppContext {
  userDB: UserDatabase<ObjectId>;
  tournamentDB: TournamentDatabase<ObjectId>;

  authToken: string;
  currentUser: User<ObjectId> | null;
}

export default AppContext;
