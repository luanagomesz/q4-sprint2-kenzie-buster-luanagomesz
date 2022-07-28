import { UserCreateInterface, UserInterface } from "../../interfaces/user";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entiity";

import bcrypt from "bcrypt";

export const userCreateService = async (
  body: UserCreateInterface,
  currentUser: UserInterface
) => {
  const userRepository = AppDataSource.getRepository(User);

  const allowedKeys = ["name", "email", "password"];
  const missingKeys = [];
  const userKeys = [];
  const wrongKeys = [];

  if (body.isAdm && !currentUser) {
    return { status: 401, message: { error: "Missing Admin Authorization" } };
  }

  for (let i = 0; i < allowedKeys.length; i++) {
    if (allowedKeys.includes(Object.keys(body)[i])) {
      userKeys.push(Object.keys(body)[i]);
    }
  }

  for (let i = 0; i < allowedKeys.length; i++) {
    if (!userKeys.includes(allowedKeys[i])) {
      missingKeys.push(allowedKeys[i]);
    }
  }

  if (missingKeys.length > 0) {
    return { status: 400, message: { missing_keys: missingKeys } };
  }

  for (let i = 0; i < Object.keys(body).length; i++) {
    if (!allowedKeys.includes(Object.keys(body)[i])) {
      wrongKeys.push(Object.keys(body)[i]);
    }
  }

  if (wrongKeys.includes("isAdm")) {
    let index = wrongKeys.indexOf("isAdm");
    wrongKeys.splice(index, 1);
  }

  if (wrongKeys.length > 0) {
    return { status: 400, message: { wrong_keys: wrongKeys } };
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  const user = new User();
  user.name = body.name;
  user.email = body.email.toLowerCase();
  user.password = hashPassword;
  user.isAdm = body.isAdm;

  userRepository.create(user);
  await userRepository.save(user);

  const { password, ...removePassword } = user;

  return { status: 201, message: removePassword };
};