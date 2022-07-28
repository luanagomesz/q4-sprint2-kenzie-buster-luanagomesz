import * as express from "express";
import { IUser } from "../../src/interfaces/user";

declare global {
  namespace Express {
    interface Request {
      newUser: IUser;
      validate: any;
    }
  }
}