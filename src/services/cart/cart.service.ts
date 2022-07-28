

import { AppDataSource } from "../../data-source";
import { Cart } from "../../entities/cart.entity";
import { UserInterface } from "../../interfaces/user";

export const cartPayService = async (newUser: UserInterface) => {
  if (!newUser) {
    return { status: 401, message: { error: "Missing Token" } };
  }

  const cartRepository = AppDataSource.getRepository(Cart);

  const cart = await cartRepository.find();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].user.id === newUser.id) {
      await cartRepository.update(cart[i].id, { paid: true });
    }
  }

  const cartUpdate = await cartRepository.find();
  const userCarts = [];

  for (let i = 0; i < cartUpdate.length; i++) {
    if (cartUpdate[i].user.id === newUser.id) {
      userCarts.push(cartUpdate[i]);
    }
  }

  return { status: 200, message: userCarts };
};