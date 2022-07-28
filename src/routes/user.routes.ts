import { Router } from "express";
import { userCreateController } from "../controllers/user.controllers";
import { userLoginController } from "../controllers/user.controllers";
import { authAdminMiddleware } from "../middlewares/adminPermission.middleware";
import { validateToken } from "../middlewares/validateToken.schema";
import { authEmailMiddlewware } from "../middlewares/emailValidation.middleware";

const route = Router();

export const userRoutes = () => {
  route.post(
    "/register",
    authEmailMiddlewware,
    validateToken,
    authAdminMiddleware,
    userCreateController
  );
  route.post("/login", userLoginController);

  return route;
};