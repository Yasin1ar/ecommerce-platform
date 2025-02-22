/**
 * Initializes and exports a Sequelize instance for database connection.
 * Uses environment variables for database configuration.
 * Attempts to authenticate the connection on initialization.
 *
 * Environment variables required:
 * - DB_NAME: Database name
 * - DB_USER: Database username
 * - DB_PASSWORD: Database password
 * - DB_HOST: Database host
 * - DB_DIALECT: Database dialect
 */
require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
