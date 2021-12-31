/**
 * The global context that all GraphQL resolvers will share containing the database
 * objects and any other important pieces of state.
 */
interface AppContext {
  userDB: UserDatabase;
}

export default AppContext;
