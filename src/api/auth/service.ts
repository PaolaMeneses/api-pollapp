import createError from "http-errors";
import dayjs from "dayjs";

import { comparePassword, createToken, hashText } from "../../utils";

import { User } from "../users/model";
import { createUser, findOneUserByEmail } from "./store";

export const login = async (auth: User) => {
  const userFound = await findOneUserByEmail(auth.email.toLowerCase());
  if (!userFound) {
    throw new createError.BadRequest("Usuario no existe");
  }

  const isPasswordValid = await comparePassword(
    auth.password,
    userFound.password
  );

  if (!isPasswordValid) {
    throw new createError.BadRequest("Usuario no valido");
  }

  const { password, ...userAuth } = userFound;
  const bodyToken = {
    user: userAuth,
    expires_at: dayjs().add(1, "days").unix(),
  };
  const token = createToken(bodyToken);
  return { token, ...bodyToken };
};

export const registerUser = async (newUser: User) => {
  const userFound = await findOneUserByEmail(newUser.email.toLowerCase());
  if (userFound) {
    throw new createError.BadRequest("Usuario ya existe");
  }

  const password = await hashText(newUser.password);

  await createUser({
    ...newUser,
    password,
    email: newUser.email.toLowerCase(),
  });
  const auth = await login({ ...newUser });
  return auth;
};
