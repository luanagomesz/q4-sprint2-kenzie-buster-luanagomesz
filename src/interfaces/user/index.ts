import { CartInterface } from "../cart";

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  isAdm: boolean;
  cart: CartInterface[];
}

export interface UserCreateInterface {
  email: string;
  name: string;
  password: string;
  isAdm?: boolean;
}

export interface LoginInterface {
  email: string;
  password: string;
}