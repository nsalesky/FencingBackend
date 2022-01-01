export default {
  Port(): string {
    return process.env.PORT ?? "4000";
  },

  DBConnString(): string {
    return process.env.DB_CONN_STRING ?? "";
  },

  DBName(): string {
    return process.env.DB_NAME ?? "";
  },

  UsersCollectionName(): string {
    return process.env.USERS_COLLECTION_NAME ?? "";
  },
};
