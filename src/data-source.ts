import { DataSource } from "typeorm";

require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl:{ rejectUnauthorized: false },
  synchronize: false,
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log("\nData Source initialized");

    console.log("\n///////\n");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });