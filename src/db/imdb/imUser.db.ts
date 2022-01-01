import { User, UserDatabase } from "../user.db";

/**
 * A simple in-memory implementation of `UserDatabase` that implements all functionality
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
