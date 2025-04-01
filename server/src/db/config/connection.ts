import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize;

if(process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: "postgres",
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: "postgres",
    }
  );
}


export default sequelize;
