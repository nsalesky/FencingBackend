import { tradeTokenForEmail } from "../../jwt";
import { User, UserDatabase } from "../user.db";

/**
 * A simple in-memory implementation of `UserDatabase` that implements all functionality
 * to store `User`s in a database,
 * but doesn't promise any kind of data persistence.
 */
class InMemoryUserDB implements UserDatabase<number> {
  // I originally used a map for this, but because efficiency is not the primary concern of this simple test implementation,
  // I switched to an array for simplicity.
  private users: User<number>[];

  constructor() {
    this.users = new Array();
  }

  getUsers(): Promise<User<number>[]> {
    return Promise.resolve(this.users);
  }

  getUserByEmail(email: string): Promise<User<number> | null> {
    return Promise.resolve(
      this.users.find((user): Boolean => user.email === email) ?? null
    );
  }

  getUserByID(id: number): Promise<User<number> | null> {
    return Promise.resolve(
      this.users.find((user): Boolean => user.id === id) ?? null
    );
  }

  async tradeTokenForUser(authToken: string): Promise<User<number> | null> {
    let email = tradeTokenForEmail(authToken);

    if (email) {
      // The token decoded successfully, see if it actually corresponds to a User and return them
      return this.getUserByEmail(email);
    } else {
      // The token did not have any email value specified
      return Promise.resolve(null);
    }
  }

  createUser(
    email: string,
    fullName: string,
    prefName: string
  ): Promise<User<number> | null> {
    if (this.users.find((user): Boolean => user.email === email)) {
      return Promise.resolve(null);
    }

    let newUser: User<number> = {
      id: this.users.length,
      email,
      fullName,
      prefName,
    };

    this.users.push(newUser);

    return Promise.resolve(newUser);
  }
}

export default InMemoryUserDB;
