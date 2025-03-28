const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/** @type {import('sequelize').Options} */
const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'parks_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  },
};

module.exports = config;
