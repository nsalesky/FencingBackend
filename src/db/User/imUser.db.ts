import { User, UserDatabase } from "./user.db";

class InMemoryUserDB implements UserDatabase {
  #users: Map<string, User>;

  constructor() {
    this.#users = new Map();
  }

  getUsers(): User[] {
    return Array.from(this.#users.values());
  }

  getUserByEmail(email: string): User | undefined {
    return this.#users.get(email);
  }

  createUser(
    email: string,
    fullName: string,
    prefName: string
  ): User | undefined {
    if (this.#users.has(email)) {
      return undefined;
    }

    let newUser: User = {
      email,
      fullName,
      prefName,
    };

    this.#users.set(email, newUser);

    return newUser;
  }
}

export default InMemoryUserDB;
