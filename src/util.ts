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

export { generateRandomString };
