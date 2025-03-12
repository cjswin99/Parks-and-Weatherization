import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DB_URL as string, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
