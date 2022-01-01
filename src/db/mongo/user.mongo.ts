import { Collection, ObjectId, WithId } from "mongodb";
import { User, UserDatabase } from "../user.db";

interface MongoUser extends WithId<Document> {
  id: ObjectId;
  email: string;
  fullName: string;
  prefName: string;
}

/**
 * An implementation of the `UserDatabase` interface using MongoDB for data persistence.
 */
export class UserMongoDB implements UserDatabase<ObjectId> {
  private usersCollection: Collection;

  constructor(usersCollection: Collection) {
    this.usersCollection = usersCollection;
  }

  async getUsers(): Promise<User<ObjectId>[]> {
    return (await this.usersCollection.find().toArray()) as MongoUser[];
  }

  async getUserByEmail(email: string): Promise<User<ObjectId> | undefined> {
    const query = { email };

    return (await this.usersCollection.findOne(query)) as MongoUser;
  }

  async createUser(
    email: string,
    fullName: string,
    prefName: string
  ): Promise<User<ObjectId> | undefined> {
    const query = { email };
    const otherUser = await this.usersCollection.findOne(query);

    // Does someone else already have this email address?
    if (otherUser !== null) {
      return undefined;
    }

    const newUser = {
      email,
      fullName,
      prefName,
    };

    await this.usersCollection.insertOne(newUser);

    return await this.getUserByEmail(email);
  }
}
