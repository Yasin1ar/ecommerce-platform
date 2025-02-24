// middlewares/errorHandler.js

const AppError = require('../utils/AppError');

// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
  // Set default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Send error response
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = globalErrorHandler;
