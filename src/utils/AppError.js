/**
 * Custom error class for handling operational errors in the application.
 * Extends the built-in Error class with additional properties for HTTP status codes.
 * 
 * @class
 * @extends {Error}
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @property {string} status - 'fail' for 4xx codes, 'error' for others
 * @property {boolean} isOperational - Indicates if error is operational
 */

class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;
  