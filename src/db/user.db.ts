/**
 * Represents a single user's data stored in the database with a generic unique ID.
 */
interface User<IdType> {
  id: IdType;
  email: string;
  fullName: string;
  prefName: string;
}

/**
 * A generic database interface with methods to create and query user data.
 */
interface UserDatabase<IdType> {
  /**
   * Gets all of the users currently stored in the database.
   *
   * @returns a list of all users
   */
  getUsers(): Promise<User<IdType>[]>;

  /**
   * Attempts to get a single user by their unique email address.
   *
   * @param email the user's email address
   *
   * @returns Either the data for the user with corresponding `email` or undefined if no such user exists
   */
  getUserByEmail(email: string): Promise<User<IdType> | undefined>;

  /**
   * Attempts to get a single user by their unique ID.
   *
   * @param id the user's ID
   *
   * @returns Either the data for the user with corresponding `id` or undefined if no such user exists
   */
  getUserByID(id: IdType): Promise<User<IdType> | undefined>;

  /**
   * Attempts to create a new user in the database, as long as no pre-existing user has already claimed that
   * email address.
   *
   * @param email the user's unique email address
   * @param fullName the user's full name
   * @param prefName the user's preferred given name
   *
   * @returns The corresponding user object if the user was successfully inserted into the database (`email` was unique) or undefined if the operation failed
   */
  createUser(
    email: string,
    fullName: string,
    prefName: string
  ): Promise<User<IdType> | undefined>;
}

export { User, UserDatabase };
