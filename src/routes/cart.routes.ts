import { Router } from "express";
import cartController from "../controllers/cart.controllers";
import { validateToken } from "../middlewares/validateToken.schema";

const routes = Router();

export const cartRoutes = () => {
  routes.patch("/pay", validateToken, cartController);
  return routes;
};