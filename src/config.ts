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
   * Gets the configured authentication header name from the AUTHENTICATION_HEADER_NAME environment variable.
   * @returns the configured AUTHENTICATION_HEADER_NAME value, or "" if no environment variable has been set.
   */
  AuthenticationHeaderName(): string {
    return process.env.AUTHENTICATION_HEADER_NAME ?? "";
  },

  /**
   * Gets the configured Firebase API key from the FIREBASE_API_KEY environment variable.
   * @returns the configured FIREBASE_API_KEY value, or "" if no environment variable has been set.
   */
  FirebaseApiKey(): string {
    return process.env.FIREBASE_API_KEY ?? "";
  },

  /**
   * Gets the configured Firebase authentication domain from the FIREBASE_AUTH_DOMAIN environment variable.
   * @returns the configured FIREBASE_AUTH_DOMAIN value, or "" if no environment variable has been set.
   */
  FirebaseAuthDomain(): string {
    return process.env.FIREBASE_AUTH_DOMAIN ?? "";
  },

  /**
   * Gets the configured Firebase project ID from the FIREBASE_PROJECT_ID environment variable.
   * @returns the configured FIREBASE_PROJECT_ID value, or "" if no environment variable has been set.
   */
  FirebaseProjectId(): string {
    return process.env.FIREBASE_PROJECT_ID ?? "";
  },

  /**
   * Gets the configured Firebase storage bucket from the FIREBASE_STORAGE_BUCKET environment variable.
   * @returns the configured FIREBASE_STORAGE_BUCKET value, or "" if no environment variable has been set.
   */
  FirebaseStorageBucket(): string {
    return process.env.FIREBASE_STORAGE_BUCKET ?? "";
  },

  /**
   * Gets the configured Firebase messaging sender ID from the FIREBASE_MESSAGING_SENDER_ID environment variable.
   * @returns the configured FIREBASE_MESSAGING_SENDER_ID value, or "" if no environment variable has been set.
   */
  FirebaseMessagingSenderID(): string {
    return process.env.FIREBASE_MESSAGING_SENDER_ID ?? "";
  },

  /**
   * Gets the configured Firebase app ID from the FIREBASE_APP_ID environment variable.
   * @returns the configured FIREBASE_APP_ID value, or "" if no environment variable has been set.
   */
  FirebaseAppID(): string {
    return process.env.FIREBASE_APP_ID ?? "";
  },

  /**
   * Gets the configured Firebase measurement ID from the FIREBASE_MEASUREMENT_ID environment variable.
   * @returns the configured FIREBASE_MEASUREMENT_ID value, or "" if no environment variable has been set.
   */
  FirebaseMeasurementID(): string {
    return process.env.FIREBASE_MEASUREMENT_ID ?? "";
  },
};
