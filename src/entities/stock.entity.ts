import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Dvd } from "./dvd.entity";

@Entity("stocks")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  quantity: number;

  @Column({ type: "float" })
  price: number;

  @OneToOne(() => Dvd, (dvd) => dvd.stock)
  dvd: Dvd;
}