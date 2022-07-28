import { AppDataSource } from "../../data-source";
import { Dvd } from "../../entities/dvd.entity";

export const dvdListService = async () => {
  const dvdRepository = AppDataSource.getRepository(Dvd);

  const dvds = await dvdRepository.find();

  return { status: 200, message: dvds };
};