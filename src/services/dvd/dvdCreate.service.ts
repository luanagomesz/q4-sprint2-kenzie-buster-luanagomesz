import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";
import { Stock } from "../../entities/stock.entity";
import { DvdCreateInterface } from "../../interfaces/dvd";
import { UserInterface } from "../../interfaces/user";

export const dvdCreateService = async (body: DvdCreateInterface, user: UserInterface) => {
  if (user && user.isAdm) {
    const dvdRepository = AppDataSource.getRepository(Dvd);
    const stockRepository = AppDataSource.getRepository(Stock);

    const allowedKeys = ["name", "duration", "price", "quantity"];
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

    const stock = new Stock();
    stock.price = body.price;
    stock.quantity = body.quantity;

    stockRepository.create(stock);
    await stockRepository.save(stock);

    const dvd = new Dvd();
    dvd.name = body.name;
    dvd.duration = body.duration;
    dvd.stock = stock;

    dvdRepository.create(dvd);
    await dvdRepository.save(dvd);

    return { status: 201, message: dvd };
  } else {
    return { status: 401, message: { error: "Missing Token" } };
  }
};