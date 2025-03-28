const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("✅ Password env:", process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};
