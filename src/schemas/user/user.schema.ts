import * as yup from "yup";
import bcrypt from "bcrypt";
import { toTitleCase } from "../../utils";

export const userSchema = yup.object().shape({
  name: yup.string().required().transform(toTitleCase),
  email: yup
    .string()
    .required()
    .transform((value: string) => value.toLowerCase()),
  password: yup
    .string()
    .required()
    .transform((value) => bcrypt.hashSync(value, 10)),
  isAdm: yup.boolean(),
});