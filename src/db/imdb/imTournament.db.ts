import config from "../../config";
import { Tournament, TournamentDatabase } from "../tournament.db";

/**
 * Generates a random alphabetic string of the given `length`. Characters can be uppercase or lowercase.
 * @param length the length of the string to generate
 * @returns a random string of the given length
 */
function generateRandomString(length: number): string {
  let result = "";

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < length; i += 1) {
    let randChoice = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randChoice);
  }

  return result;
}

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

  getPublicTournaments(afterDate: Date | null): Promise<Tournament<number>[]> {
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

  getManagedTournaments(userId: number): Promise<Tournament<number>[]> {
    return Promise.resolve(
      this.tournaments.filter((tournament): Boolean => {
        return tournament.managers.includes(userId);
      })
    );
  }
  getTournament(id: number): Promise<Tournament<number> | null> {
    let possibleEntry = this.tournaments.find(
      (tournament): Boolean => tournament.id === id
    );

    return Promise.resolve(possibleEntry ?? null);
  }

  createTournament(
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
      privateCode,
      location,
      time,
    };

    this.tournaments.push(newTournament);

    return Promise.resolve(newTournament);
  }
}
