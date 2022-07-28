import * as yup from "yup";

export const dvdBuySchema = yup.object().shape({
  quantity: yup.number().positive().required(),
});