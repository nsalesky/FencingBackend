import { Collection, MongoClient } from "mongodb";
import dotenv from "dotenv";
import config from "../../config";

/**
 * The set of MongoDB collections needed for the database operations.
 */
interface DBCollections {
  usersCollection: Collection;
  tournamentsCollection: Collection;
}

/**
 * Connects to the MongoDB database and creates references for all of the collections.
 * @returns an object containing references to all MongoDB collections for the app
 */
export async function connectToDatabase(): Promise<DBCollections> {
  const client = new MongoClient(config.DBConnString());
  await client.connect();

  const db = client.db(config.DBName());

  const usersCollection = db.collection(config.UsersCollectionName());
  const tournamentsCollection = db.collection(
    config.TournamentsCollectionName()
  );

  return {
    usersCollection,
    tournamentsCollection,
  };
}
