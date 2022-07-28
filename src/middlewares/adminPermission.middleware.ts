import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError, handleError } from "../errors/appError";

export const authAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.newUser && !req.newUser.isAdm) {
      return res.status(401).json({ error: "Missing Admin Permission" });
    }

    next();
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};