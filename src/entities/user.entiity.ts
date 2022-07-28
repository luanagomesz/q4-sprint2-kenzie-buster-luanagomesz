import { compare } from "bcrypt";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Cart } from "./cart.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdm?: boolean;

  @OneToOne(() => Cart, (cart) => cart.user, { lazy: true })
  cart: Cart;

  comparePassword = async (pwd: string): Promise<boolean> => {
    return await compare(pwd, this.password);
  };
}