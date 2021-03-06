import { Collection, FindCursor, ObjectId, WithId } from "mongodb";
import { tradeTokenForEmail } from "../../jwt";
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
function toUser(user: MongoUser): User<ObjectId> {
  return {
    ...user,
    id: user._id,
  };
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
    return (
      // Find all users
      ((await this.usersCollection.find()) as FindCursor<MongoUser>)
        // Rename the _id field to id
        .map((mongoUser: MongoUser): User<ObjectId> => toUser(mongoUser))
        // Return it as an array
        .toArray()
    );
  }

  async getUserByEmail(email: string): Promise<User<ObjectId> | null> {
    const query = { email };

    let potentialUser = await this.usersCollection.findOne(query);

    if (potentialUser) {
      // There is a user, put it in the correct form
      return toUser(potentialUser as MongoUser);
    } else {
      // There is no user with that email
      return null;
    }
  }

  async getUserByID(id: ObjectId): Promise<User<ObjectId> | null> {
    // Convert the ID into MongoDB form, I don't exactly know why this is necessary but it does the trick
    const query = { _id: new ObjectId(id) };

    let potentialUser = await this.usersCollection.findOne(query);

    if (potentialUser) {
      // There is a user, put it in the correct form
      return toUser(potentialUser as MongoUser);
    } else {
      // There is no user with that ID
      return null;
    }
  }

  async tradeTokenForUser(authToken: string): Promise<User<ObjectId> | null> {
    let email = tradeTokenForEmail(authToken);

    if (email) {
      // The token decoded successfully, see if it actually corresponds to a User and return them
      return this.getUserByEmail(email);
    } else {
      // The token did not have any email value specified
      return Promise.resolve(null);
    }
  }

  async createUser(
    email: string,
    fullName: string,
    prefName: string
  ): Promise<User<ObjectId> | null> {
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
        return null;
      });
  }
}
