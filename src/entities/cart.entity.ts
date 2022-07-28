import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
  } from "typeorm";
  import { Dvd } from "./dvd.entity";
  import { User } from "./user.entiity";
  
  @Entity("carts")
  export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id?: string;
  
    @Column({ default: false })
    paid: boolean;
  
    @Column({ type: "float" })
    total: number;
  
    @OneToOne(() => User, (user) => user.cart, { eager: true, nullable: true })
    @JoinColumn()
    user: User;
  
    @ManyToOne(() => Dvd, (dvd) => dvd.carts, { eager: true })
    dvd: Dvd;
  }