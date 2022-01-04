import { Collection, FindCursor, ObjectId, WithId } from "mongodb";
import { User, UserDatabase } from "../user.db";

/**
 * A wrapper interface over the `User` type that represents a single
 * user in the MongoDB users collection and can be safely casted to
 * and from queries to the database.
 */
interface MongoUser extends WithId<Document> {
  _id: ObjectId;
  email: string;
  fullName: string;
  prefName: string;
}

/**
 * Converts the given `MongoUser` to an equivalent `User` object. Notably, the `_id` field is copied over
 * to the expected `id` field in order for GraphQL resolvers to parse it correctly.
 * @param user the user's data in MongoDB form
 * @returns the user's data with an `id` field equal to the MongoDB `_id` value
 */
const toUser = (user: MongoUser): User<ObjectId> => {
  return {
    id: user._id,
    ...user,
  };
};

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
    // Find all users
    return (
      ((await this.usersCollection.find()) as FindCursor<MongoUser>)
        // Rename the _id field to id
        .map((mongoUser: MongoUser): User<ObjectId> => toUser(mongoUser))
        // Return it as an array
        .toArray()
    );
  }

  async getUserByEmail(email: string): Promise<User<ObjectId> | undefined> {
    const query = { email };

    return toUser((await this.usersCollection.findOne(query)) as MongoUser);
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
