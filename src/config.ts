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

  /**
   * Gets the configured authentication header name from the AUTH_HEADER_NAME environment variable.
   * @returns the configured AUTH_HEADER_NAME value, or "" if no environment variable has been set.
   */
  // AuthHeaderName(): string {
  //   return process.env.AUTH_HEADER_NAME ?? "";
  // },

  /**
   * Gets the configured authentication secret key from the AUTH_SECRET environment variable.
   * @returns the configured AUTH_SECRET value, or "" if no environment variable has been set.
   */
  AuthSecret(): string {
    return process.env.AUTH_SECRET ?? "";
  },
};
