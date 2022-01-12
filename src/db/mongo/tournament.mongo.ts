import {
  Collection,
  FindCursor,
  InsertOneResult,
  ObjectId,
  UpdateResult,
  WithId,
} from "mongodb";
import config from "../../config";
import { generateRandomString } from "../../util";
import { Tournament, TournamentDatabase } from "../tournament.db";

interface MongoTournament extends WithId<Document> {
  _id: ObjectId;
  name: string;
  managers: ObjectId[];
  participants: ObjectId[];
  privateCode: string | null;
  loc: string;
  time: Date;
}

/**
 * Converts the given `MongoTournament` to an equivalent `Tournament` object by copying over missing
 * fields to their correct names.
 * @param tournament the tournament data in MongoDB form
 * @returns the tournament's data in its equivalent generic form to interface with other database functions
 */
function toTournament(tournament: MongoTournament): Tournament<ObjectId> {
  return {
    ...tournament,
    id: tournament._id,
    location: tournament.loc,
  };
}

/**
 * An implementation of the `TournamentDatabase` interface using MongoDB for data persistence.
 */
export class TournamentMongoDB implements TournamentDatabase<ObjectId> {
  private tournamentsCollection: Collection;

  constructor(tournamentsCollection: Collection) {
    this.tournamentsCollection = tournamentsCollection;
  }

  async getPublicTournaments(
    afterDate: Date | null
  ): Promise<Tournament<ObjectId>[]> {
    const publicFilter = {
      privateCode: null,
      time: {
        $gte: afterDate ?? new Date(0),
      },
    };

    return (
      // Find all tournaments with a null privateCode
      (
        (await this.tournamentsCollection.find(
          publicFilter
        )) as FindCursor<MongoTournament>
      )
        // Rename the fields
        .map(
          (tournament: MongoTournament): Tournament<ObjectId> =>
            toTournament(tournament)
        )
        // Return it as an array
        .toArray()
    );
  }

  async getManagedTournaments(
    userId: ObjectId
  ): Promise<Tournament<ObjectId>[]> {
    // Matches all tournaments that include this user as a manager
    const managerFilter = { managers: new ObjectId(userId) };

    return (
      // Find all tournaments with this manager
      (
        (await this.tournamentsCollection.find(
          managerFilter
        )) as FindCursor<MongoTournament>
      )
        // Rename the fields
        .map(
          (tournament: MongoTournament): Tournament<ObjectId> =>
            toTournament(tournament)
        )
        // Return it as an array
        .toArray()
    );
  }

  async getTournament(id: ObjectId): Promise<Tournament<ObjectId> | null> {
    const idFilter = { _id: new ObjectId(id) };

    let potentialTournament = await this.tournamentsCollection.findOne(
      idFilter
    );

    if (potentialTournament) {
      return toTournament(potentialTournament as MongoTournament);
    } else {
      return null;
    }
  }

  async getTournamentByCode(
    privateCode: string
  ): Promise<Tournament<ObjectId> | null> {
    const codeFilter = { privateCode };

    let potentialTournament = await this.tournamentsCollection.findOne(
      codeFilter
    );

    if (potentialTournament) {
      return toTournament(potentialTournament as MongoTournament);
    } else {
      return null;
    }
  }

  async createTournament(
    name: string,
    initialManager: ObjectId,
    isPrivate: Boolean,
    location: string,
    time: Date
  ): Promise<Tournament<ObjectId> | null> {
    let privateCode: string | null = null;

    if (isPrivate) {
      // Generate the unique private code. There is a lot of repetition from the In-Memory
      // version, but the databases are different enough that there's not really a clear abstraction
      while (privateCode === null) {
        let possibleCode = generateRandomString(config.TournamentCodeLength());

        // Is there a tournament with a matching code?
        let sameCodeFilter = { privateCode: possibleCode };
        let matching = await this.tournamentsCollection.findOne(sameCodeFilter);

        if (!matching) {
          // No tournaments have this code
          privateCode = possibleCode;
          break;
        }
      }
    }

    const newTournament = {
      name,
      managers: [initialManager],
      participants: [],
      privateCode,
      loc: location,
      time,
    };

    return await this.tournamentsCollection
      .insertOne(newTournament)
      .then((result: InsertOneResult) => {
        // Insertion was successful
        return this.getTournament(result.insertedId);
      })
      .catch((reason) => {
        // Insertion was not successful for some reason
        return null;
      });
  }

  async registerUser(
    id: ObjectId,
    userId: ObjectId
  ): Promise<Tournament<ObjectId> | null> {
    const tournamentFilter = { _id: new ObjectId(id) };
    const update = {
      $addToSet: {
        participants: new ObjectId(userId),
      },
    };

    return await this.tournamentsCollection
      .updateOne(tournamentFilter, update)
      .then((updateResult: UpdateResult) => {
        return this.getTournament(id);
      })
      .catch((reason) => {
        return null;
      });
  }

  async unregisterUser(
    id: ObjectId,
    userId: ObjectId
  ): Promise<Tournament<ObjectId> | null> {
    const tournamentFilter = { _id: new ObjectId(id) };
    const update = {
      $pull: {
        participants: new ObjectId(userId),
      },
    };

    return await this.tournamentsCollection
      .updateOne(tournamentFilter, update)
      .then((updateResult: UpdateResult) => {
        return this.getTournament(id);
      })
      .catch((reason) => {
        return null;
      });
  }
}
