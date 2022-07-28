

import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";
import { User } from "../../entities/user.entiity";
import { Stock } from "../../entities/stock.entity";
import { Cart } from "../../entities/cart.entity";
import { UserInterface } from "../../interfaces/user";
import { stockInterface } from "../../interfaces/stock";

export const dvdBuyService = async (
  dvdId: string,
  newUser: UserInterface,
  body: stockInterface,
  token: string
) => {
  if (!newUser || !token) {
    return { status: 401, message: { error: "Missing Authorization Token" } };
  }

  const allowedKeys = ["quantity"];
  const missingKeys = [];
  const userKeys = [];
  const wrongKeys = [];

  for (let i = 0; i < allowedKeys.length; i++) {
    if (allowedKeys.includes(Object.keys(body)[i])) {
      userKeys.push(Object.keys(body)[i]);
    }
  }

  for (let i = 0; i < allowedKeys.length; i++) {
    if (!userKeys.includes(allowedKeys[i])) {
      missingKeys.push(allowedKeys[i]);
    }
  }

  if (missingKeys.length > 0) {
    return { status: 400, message: { missing_keys: missingKeys } };
  }

  for (let i = 0; i < Object.keys(body).length; i++) {
    if (!allowedKeys.includes(Object.keys(body)[i])) {
      wrongKeys.push(Object.keys(body)[i]);
    }
  }

  if (wrongKeys.length > 0) {
    return { status: 400, message: { wrong_keys: wrongKeys } };
  }

  const dvdRepository = AppDataSource.getRepository(Dvd);
  const userRepository = AppDataSource.getRepository(User);
  const stockRepository = AppDataSource.getRepository(Stock);
  const cartRepository = AppDataSource.getRepository(Cart);

  const dvd = await dvdRepository.findOneBy({
    id: dvdId,
  });

  if (!dvd) {
    return { status: 404, message: { error: "DVD not found." } };
  }

  const user = await userRepository.findOneBy({
    id: newUser.id,
  });

  const stock = await stockRepository.findOneBy({
    id: dvd?.stock.id,
  });

  if (dvd && body.quantity > dvd.stock.quantity) {
    return {
      status: 422,
      message: {
        error: `current stock: ${dvd.stock.quantity}, received demand: ${body.quantity}`,
      },
    };
  }

  if (stock && dvd && user) {
    await stockRepository.update(stock.id, {
      quantity: dvd.stock.quantity - body.quantity,
    });

    const cart = new Cart();
    cart.total = stock.price * body.quantity;
    cart.paid = false;
    cart.user = user;
    cart.dvd = dvd;

    cartRepository.create(cart);
    await cartRepository.save(cart);

    const newReturn = {
      id: cart.id,
      total: cart.total,
      paid: cart.paid,
      newUser: user,
      dvd,
    };

    return { status: 201, message: newReturn };
  }

  return { status: 400, message: { error: "Error" } };
};