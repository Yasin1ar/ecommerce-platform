/**
 * Express server initialization and database setup.
 * Configures middleware, routes, and establishes DB connection.
 * Syncs database models and starts server on specified PORT.
 * Uses Sequelize for ORM and Express for API routing.
 */

const helmet = require("helmet");
const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate');
const morgan = require('morgan');
const app = express();
const limiter = require('./middleware/rateLimiter');


// Apply to all requests
app.use(limiter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cors())
app.use(helmet());
app.use(morgan('dev'));
app.use("/api/auth", authRoutes);
app.use("/api/products",authenticate, productRoutes);
app.use('/api/categories', authenticate,categoryRoutes);
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
