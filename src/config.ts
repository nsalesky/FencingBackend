export default {
  /**
   * Gets the configured port to host the web server on from the PORT environment variable.
   * @returns the configured PORT number, or 4000 if no environment variable has been set.
   */
  Port(): string {
    return process.env.PORT ?? "4000";
  },

  /**
   * Gets the configured MongoDB connection string from the DB_CONN_STRING environment variable.
   * @returns the configured DB_CONN_STRING value, or "" if no environment variable has been set.
   */
  DBConnString(): string {
    return process.env.DB_CONN_STRING ?? "";
  },

  /**
   * Gets the configured MongoDB database name from the DB_NAME environment variable.
   * @returns the configured DB_NAME value, or "" if no environment variable has been set.
   */
  DBName(): string {
    return process.env.DB_NAME ?? "";
  },

  /**
   * Gets the configured MongoDB users collection name from the USERS_COLLECTION_NAME environment variable.
   * @returns the configured USERS_COLLECTION_NAME value, or "" if no environment variable has been set.
   */
  UsersCollectionName(): string {
    return process.env.USERS_COLLECTION_NAME ?? "";
  },
};
