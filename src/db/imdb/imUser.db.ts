import { tradeTokenForEmail } from "../../jwt";
import { User, UserDatabase } from "../user.db";

/**
 * A simple in-memory implementation of `UserDatabase` that implements all functionality
 * to store `User`s in a database,
 * but doesn't promise any kind of data persistence.
 */
class InMemoryUserDB implements UserDatabase<number> {
  private users: Map<string, User<number>>;

  constructor() {
    this.users = new Map();
  }

  getUsers(): Promise<User<number>[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }

  getUserByEmail(email: string): Promise<User<number> | undefined> {
    return Promise.resolve(this.users.get(email));
  }

  getUserByID(id: number): Promise<User<number> | undefined> {
    // Find all users with the given ID
    let matchingUsers = Array.from(this.users.values()).filter(
      (user: User<number>): boolean => {
        return user.id === id;
      }
    );

    if (matchingUsers.length === 0) {
      // No users have that ID
      return Promise.resolve(undefined);
    } else {
      // At least one user has that ID, just return the first user, because there should only be one
      return Promise.resolve(matchingUsers[0]);
    }
  }

  async tradeTokenForUser(
    authToken: string
  ): Promise<User<number> | undefined> {
    let email = tradeTokenForEmail(authToken);

    if (email) {
      // The token decoded successfully, see if it actually corresponds to a User and return them
      return this.getUserByEmail(email);
    } else {
      // The token did not have any email value specified
      return Promise.resolve(undefined);
    }
  }

  createUser(
    email: string,
    fullName: string,
    prefName: string
  ): Promise<User<number> | undefined> {
    if (this.users.has(email)) {
      return Promise.resolve(undefined);
    }

    let newUser: User<number> = {
      id: this.users.size,
      email,
      fullName,
      prefName,
    };

    this.users.set(email, newUser);

    return Promise.resolve(newUser);
  }
}

export default InMemoryUserDB;
