import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const dbName = process.env.DB_NAME || "parksandweather_db";
const dbUser = process.env.DB_USER || "postgres";
const dbPass = process.env.DB_PASSWORD || "your_password";
const dbHost = process.env.DB_HOST || "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: "postgres",
  logging: false,
});

export default sequelize;