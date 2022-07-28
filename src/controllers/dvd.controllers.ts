import { Request, Response } from "express";
import {dvdListService } from "../services/dvd/dvd.service";
import { dvdBuyService } from "../services/dvd/dvdBuy.service";
import { dvdCreateService } from "../services/dvd/dvdCreate.service";
export const buyDvdController = async (req: Request, res: Response) => {
  try {
    const { dvdId } = req.params;
    const token = String(req.headers.authorization);

    const buyDvd = await dvdBuyService(dvdId, req.newUser, req.body, token);

    return res.status(buyDvd.status).json(buyDvd.message);
  } catch (err) {
    console.error(err);
  }
};

export const createDvdController = async (req: Request, res: Response) => {
  try {
    const dvd = await dvdCreateService(req.body, req.newUser);

    return res.status(dvd.status).json(dvd.message);
  } catch (err) {
    console.error(err);
  }
};

export const getDvdController = async (req: Request, res: Response) => {
  try {
    const dvd = await dvdListService();

    return res.status(dvd.status).json(dvd.message);
  } catch (err) {
    console.error(err);
  }
};