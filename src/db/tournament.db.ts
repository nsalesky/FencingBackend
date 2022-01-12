/**
 * Represents a single tournament stored in the database with a generic unique ID.
 */
interface Tournament<IdType> {
  /**
   * The unique ID for this tournament.
   */
  id: IdType;

  /**
   * This tournament's display name.
   */
  name: string;

  /**
   * The list of ID's for `User`s qualified to manage this tournament. These users can run bouts and edit the results.
   * All managers are considered equal.
   */
  managers: IdType[];

  /**
   * The unique code controlling the privacy of this tournament. If `null`, then this tournament is considered public, and anyone may see the results
   * and register for it. If a `string`, then this tournament is considered private, and a user must provide the matching string code in order
   * to see the results or register.
   */
  privateCode: string | null;

  /**
   * The location where this tournament will be held.
   */
  location: string;

  /**
   * The time at which this tournament will be held.
   */
  time: Date;
}

/**
 * A generic database interface with methods to create and query tournament data.
 */
interface TournamentDatabase<IdType> {
  /**
   * Get all public tournaments set after the given date.
   * @param afterDate the cutoff date for tournaments, don't return tournaments before this date, or return all tournaments if null
   * @returns the list of all public tournaments set after the given date.
   */
  getPublicTournaments(afterDate: Date | null): Promise<Tournament<IdType>[]>;

  /**
   * Get all tournaments managed by the `User` with the given ID.
   * @param userId the unique ID of the user to query
   * @returns the list of all tournaments managed by the given user
   */
  getManagedTournaments(userId: IdType): Promise<Tournament<IdType>[]>;

  /**
   * Gets the tournament with the given `id`.
   * @param id the id of the tournament to query
   * @returns the tournament with the given ID, or null if none such exists
   */
  getTournament(id: IdType): Promise<Tournament<IdType> | null>;

  /**
   * Gets the tournament with the given `privateCode`.
   * @param privateCode the private code to query
   * @returns the tournament with the given code, or null if none such exists
   */
  getTournamentByCode(privateCode: string): Promise<Tournament<IdType> | null>;

  /**
   * Attempts to create a new tournament with the given information
   * @param name the tournament's display name
   * @param initialManager the initial manager for this tournament
   * @param isPrivate should the tournament be private?
   * @param location the location of the tournament
   * @param time the time at which the tournament takes place
   */
  createTournament(
    name: string,
    initialManager: IdType,
    isPrivate: Boolean,
    location: string,
    time: Date
  ): Promise<Tournament<IdType> | null>;
}

export { Tournament, TournamentDatabase };
