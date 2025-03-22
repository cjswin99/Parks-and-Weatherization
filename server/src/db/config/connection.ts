import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log("🔐 Loaded DB credentials:", {
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});

const sequelize = new Sequelize(
  "parksandweather_db",     // DB name
  "postgres",               // DB user
  "daycius",                // DB password
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);


export default sequelize;
