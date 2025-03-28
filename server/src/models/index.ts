import { Sequelize } from 'sequelize';
import { User } from './User.js';
import { Park } from './Park.js';
import { Weather } from './Weather.js';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  logging: false,
});

Park.hasMany(Weather, {
  foreignKey: 'parkId',
  as: 'weatherForecasts',
  onDelete: 'CASCADE',
});

Weather.belongsTo(Park, {
  foreignKey: 'parkId',
  as: 'park',
});

export { sequelize, User, Park, Weather };
