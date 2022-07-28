import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(
      token as string,
      String(process.env.SECRET_KEY),
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            error: {
              name: "JsonWebTokenError",
              message: "jwt malformed",
            },
          });
        }

        req.newUser = decoded.user;
      }
    );
  }

  next();
};