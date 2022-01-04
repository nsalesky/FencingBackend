import jwt, { JwtPayload } from "jsonwebtoken";
import config from "./config";

/**
 * A JWT Payload that possibly includes a User's email.
 */
interface UserPayload extends JwtPayload {
  email?: string;
}

/**
 * Trades a JSON Web Token for the encrypted email value possibly contained within it.
 * @param authToken the JWT to decode
 * @returns the email contained within the JWT, if it exists, or undefined if it does not
 */
const tradeTokenForEmail = async (
  authToken: string
): Promise<string | undefined> => {
  let result: string | undefined = undefined;

  jwt.verify(
    authToken,
    config.AuthSecret,
    undefined,
    (err: any, payload: UserPayload | undefined): void => {
      if (err) return;
      if (payload === undefined) return;
      if (payload.email) {
        // The payload included an actual email
        result = payload.email;
      }
    }
  );

  return Promise.resolve(result);
};

export { tradeTokenForEmail };
