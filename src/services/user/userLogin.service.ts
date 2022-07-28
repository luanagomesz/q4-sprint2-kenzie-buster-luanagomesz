import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entiity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LoginInterface } from "../../interfaces/user";

dotenv.config();

export const userLoginService = async (body: LoginInterface) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: body.email,
    },
  });

  const allowedKeys = ["email", "password"];
  const missingKeys = [];
  const userKeys = [];
  const wrongKeys = [];

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

  if (wrongKeys.length > 0) {
    return { status: 400, message: { wrong_keys: wrongKeys } };
  }

  if (!user) {
    return {
      status: 404,
      message: { error: "Email or Password wrong." },
    };
  }

  const compare = await bcrypt.compare(body.password, user.password);

  if (!compare) {
    return {
      status: 404,
      message: { error: "Email or Password wrong." },
    };
  }

  const token = jwt.sign({ user: user }, String(process.env.SECRET_KEY), {
    expiresIn: process.env.EXPIRES_IN,
  });

  return { status: 200, message: { access_token: token } };
};