/**
 * Rate limiter middleware for authentication routes.
 * Restricts each IP address to 10 requests per 15 minutes window.
 * Returns 429 status with error message when limit is exceeded.
 * 
 * @module authLimiter
 */
const rateLimit = require('express-rate-limit');

// Apply rate limiting to authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: 'Too many attempts, please try again later.',
});

module.exports = authLimiter;
