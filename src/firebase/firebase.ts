import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import config from "../config";

/**
 * Initializes Firebase with the configured environment variables only if an instance has not already been initialized.
 */
const initializeFirebase = () => {
  if (getApps().length === 0) {
    initializeApp({
      apiKey: config.FirebaseApiKey(),
      authDomain: config.FirebaseAuthDomain(),
      projectId: config.FirebaseProjectId(),
      storageBucket: config.FirebaseStorageBucket(),
      messagingSenderId: config.FirebaseMessagingSenderID(),
      appId: config.FirebaseAppID(),
      measurementId: config.FirebaseMeasurementID(),
    });
  }
};

export default initializeFirebase;
