/**
 * Express server initialization and database setup.
 * Configures middleware, routes, and establishes DB connection.
 * Syncs database models and starts server on specified PORT.
 * Uses Sequelize for ORM and Express for API routing.
 */
const helmet = require("helmet");
const express = require("express");
const sequelize = require("./config");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());
app.use(helmet());
app.use("/api/auth", authRoutes);
app.use(errorHandler);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced.");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
