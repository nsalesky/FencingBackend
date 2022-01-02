import { Collection, ObjectId, WithId } from "mongodb";
import { User, UserDatabase } from "../user.db";

/**
 * A wrapper interface over the `User` type that represents a single
 * user in the MongoDB users collection and can be safely casted to
 * from queries to the database.
 */
interface MongoUser extends WithId<Document>, User<ObjectId> {
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

    // Create the email index ensuring that we can efficiently query Users by their unique email address
    this.usersCollection.createIndex({ email: 1 }, { unique: true });
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
    const newUser = {
      email,
      fullName,
      prefName,
    };

    return await this.usersCollection
      .insertOne(newUser)
      .then(() => {
        // Insertion was successful
        return this.getUserByEmail(email);
      })
      .catch((reason) => {
        // Insertion was not successful: duplicate email
        return Promise.resolve(undefined);
      });
  }
}
