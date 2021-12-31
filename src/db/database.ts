/**
 * Represents a single user's data stored in the database.
 */
interface User {
  email: string;
  fullName: string;
  prefName: string;
}

/**
 * A generic database interface with methods to create and query data.
 */
interface Database {
  /**
   * Gets all of the users currently stored in the database.
   *
   * @returns a list of all users
   */
  getUsers: () => [User];

  /**
   * Attempts to get a single user by their unique email address.
   *
   * @param email the user's email address
   *
   * @returns Either the data for the user with corresponding `email` or null if no such user exists
   */
  getUserByEmail: (email: string) => User | null;

  /**
   * Attempts to create a new user in the database, as long as no pre-existing user has already claimed that
   * email address.
   *
   * @param email the user's unique email address
   * @param fullName the user's full name
   * @param prefName the user's preferred given name
   *
   * @returns The corresponding user object if the user was successfully inserted into the database (`email` was unique) or null if the operation failed
   */
  createUser: (
    email: string,
    fullName: string,
    prefName: string
  ) => User | null;
}
