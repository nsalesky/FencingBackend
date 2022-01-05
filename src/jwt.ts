import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import config from "./config";
import { User } from "./db/user.db";

/**
 * A JWT Payload that possibly includes a `User`'s email.
 */
interface UserPayload extends JwtPayload {
  email?: string;
}

/**
 * Trades a JSON Web Token for the encrypted email value possibly contained within it.
 * @param authToken the JWT to decode
 * @returns the email contained within the JWT, if it exists, or undefined if it does not
 */
const tradeTokenForEmail = (authToken: string): string | undefined => {
  try {
    // Try and verify the token
    let result = jwt.verify(authToken, config.AuthSecret(), {
      algorithms: ["HS256"],
    }) as UserPayload;

    // Check whether the token contains an email field
    if (result.email) {
      // The token does contain an email field
      return result.email;
    } else {
      // The token doesn't contain an email field so it is invalid
      return undefined;
    }
  } catch (err) {
    console.log(err);

    // The token is invalid in some way
    return undefined;
  }
};

export { tradeTokenForEmail };
