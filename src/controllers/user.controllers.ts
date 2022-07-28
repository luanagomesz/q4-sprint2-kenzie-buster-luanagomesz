import { Request, Response } from "express";
import { userCreateService } from "../services/user/userCreate.service";
import { userLoginService } from "../services/user/userLogin.service";

export const userCreateController = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const currentUser = req.newUser;

    const user = await userCreateService(req.body, currentUser);

    return res.status(user.status).json(user.message);
  } catch (err) {
    console.error(err);
  }
};

export const userLoginController = async (req: Request, res: Response) => {
  try {
    const login = await userLoginService(req.body);

    return res.status(login.status).json(login.message);
  } catch (err) {
    console.error(err);
  }
};