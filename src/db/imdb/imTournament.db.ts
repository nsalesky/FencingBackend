import config from "../../config";
import { generateRandomString } from "../../util";
import { Tournament, TournamentDatabase } from "../tournament.db";

/**
 * A simple in-memory implementation of `TournamentDatabase` that implements all functionality
 * to store `Tournament`s in a database,
 * but doesn't promise any kind of data persistence.
 */
class InMemoryTournamentDB implements TournamentDatabase<number> {
  private tournaments: Tournament<number>[];

  constructor() {
    this.tournaments = new Array();
  }

  async getPublicTournaments(
    afterDate: Date | null
  ): Promise<Tournament<number>[]> {
    return Promise.resolve(
      this.tournaments.filter((tournament): Boolean => {
        if (afterDate) {
          // We need to check that the date is after the cutoff
          return tournament.time.getTime() >= afterDate.getTime();
        } else {
          // There is no cutoff, so all tournaments are valid
          return true;
        }
      })
    );
  }

  async getManagedTournaments(userId: number): Promise<Tournament<number>[]> {
    return Promise.resolve(
      this.tournaments.filter((tournament): Boolean => {
        return tournament.managers.includes(userId);
      })
    );
  }

  async getRegisteredTournaments(
    userId: number
  ): Promise<Tournament<number>[]> {
    return Promise.resolve(
      this.tournaments.filter((tournament): Boolean => {
        return tournament.participants.includes(userId);
      })
    );
  }

  async getTournament(id: number): Promise<Tournament<number> | null> {
    let possibleEntry = this.tournaments.find(
      (tournament): Boolean => tournament.id === id
    );

    return Promise.resolve(possibleEntry ?? null);
  }

  async getTournamentByCode(
    privateCode: string
  ): Promise<Tournament<number> | null> {
    let possibleEntry = this.tournaments.find(
      (tournament): Boolean => tournament.privateCode === privateCode
    );

    return Promise.resolve(possibleEntry ?? null);
  }

  async createTournament(
    name: string,
    initialManager: number,
    isPrivate: Boolean,
    location: string,
    time: Date
  ): Promise<Tournament<number> | null> {
    let privateCode: string | null = null;

    if (isPrivate) {
      // Generate the unique private code
      while (privateCode === null) {
        let possibleCode = generateRandomString(config.TournamentCodeLength());

        // Is there a tournament with a matching code?
        let matching = this.tournaments.find(
          (tournament): Boolean =>
            tournament.privateCode
              ? tournament.privateCode === possibleCode
              : false
        );

        if (matching === undefined) {
          // No tournaments have this code
          privateCode = possibleCode;
          break;
        }
      }
    }

    const newTournament: Tournament<number> = {
      id: this.tournaments.length,
      name,
      managers: [initialManager],
      participants: [],
      privateCode,
      location,
      time,
    };

    this.tournaments.push(newTournament);

    return Promise.resolve(newTournament);
  }

  async registerUser(
    id: number,
    userId: number
  ): Promise<Tournament<number> | null> {
    let possibleIndex = this.tournaments.findIndex(
      (tournament): Boolean => tournament.id === id
    );

    if (possibleIndex !== -1) {
      let tournamentValue = this.tournaments[possibleIndex];

      if (!tournamentValue.participants.includes(userId)) {
        // Only add it once, don't throw an error if a user attempts to register multiple times,
        // just handle it silently
        tournamentValue.participants.push(userId);

        // Update the array
        this.tournaments[possibleIndex] = tournamentValue;
      }

      return tournamentValue;
    } else {
      return null;
    }
  }

  async unregisterUser(
    id: number,
    userId: number
  ): Promise<Tournament<number> | null> {
    let possibleIndex = this.tournaments.findIndex(
      (tournament): Boolean => tournament.id === id
    );

    if (possibleIndex !== -1) {
      let tournamentValue = this.tournaments[possibleIndex];

      let userIndex = tournamentValue.participants.findIndex(
        (idValue) => idValue === userId
      );

      if (userIndex !== -1) {
        // User is present, so remove them
        tournamentValue.participants.splice(userIndex, 1);

        //Update the stored value
        this.tournaments[possibleIndex] = tournamentValue;
      }

      return tournamentValue;
    } else {
      return null;
    }
  }
}
