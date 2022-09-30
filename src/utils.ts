import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "./config";

const saltRounds = 10;

export const hashText = (text: string) => {
  return bcrypt.hash(text, saltRounds);
};

export const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

export function createToken<T extends Object | String | Buffer>(payload: T) {
  return jwt.sign(payload, TOKEN_KEY);
}

export function decodeToken<T>(payload: string): T {
  return jwt.verify(payload, TOKEN_KEY) as T;
}
