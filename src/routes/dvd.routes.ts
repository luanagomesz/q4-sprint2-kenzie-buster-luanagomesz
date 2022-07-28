import { Router } from "express";
import { buyDvdController } from "../controllers/dvd.controllers";
import { createDvdController } from "../controllers/dvd.controllers";
import { getDvdController } from "../controllers/dvd.controllers";
import { authAdminMiddleware } from "../middlewares/adminPermission.middleware";
import { validateToken } from "../middlewares/validateToken.schema";

const route = Router();

export const dvdRoutes = () => {
  route.get("", getDvdController);
  route.post(
    "/register",
    validateToken,
    authAdminMiddleware,
    createDvdController
  );
  route.post("/buy/:dvdId", validateToken, buyDvdController);

  return route;
};