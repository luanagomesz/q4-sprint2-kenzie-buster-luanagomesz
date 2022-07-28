
import { Request, Response } from "express";
import { cartPayService } from "../services/cart/cart.service"

const cartController = async (req: Request, res: Response) => {
  try {
    const pay = await cartPayService(req.newUser);

    return res.status(pay.status).json(pay.message);
  } catch (err) {
    console.error(err);
  }
};

export default cartController;