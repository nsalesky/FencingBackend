import { ObjectId } from "mongodb";
import { User, UserDatabase } from "../db/user.db";

/**
 * The global context that all GraphQL resolvers will share containing the database
 * objects and any other important pieces of state.
 */
interface AppContext {
  userDB: UserDatabase<ObjectId>;

  authToken: string;
  currentUser: User<ObjectId> | null;
}

export default AppContext;
