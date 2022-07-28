import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { Cart } from "./cart.entity";
  import { Stock } from "./stock.entity";
  
  @Entity("dvds")
  export class Dvd {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
  
    @Column()
    name: string;
  
    @Column()
    duration: string;
  
    @OneToMany(() => Cart, (cart) => cart.dvd)
    carts: Cart[];
  
    // @OneToOne(() => Stock, (stock) => stock.dvd)
    @OneToOne(() => Stock, (stock) => stock.dvd, { eager: true })
    @JoinColumn()
    stock: Stock;
  }