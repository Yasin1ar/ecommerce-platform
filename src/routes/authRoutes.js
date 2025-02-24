/**
 * Authentication router configuration for user registration and login endpoints.
 * Implements rate limiting and validation middleware for both routes.
 * Register route validates username, email and password.
 * Login route validates email and password.
 * Both routes are protected against brute force attacks.
 */

const express = require("express");
const {
  registerValidationRules,
  loginValidationRules,
  validate,
} = require("../middleware/authValidator");
const { registerUser, loginUser } = require("../controllers/authController");
const authLimiter = require("../middleware/rateLimiter");

const router = express.Router();

// Register route
router.post(
  "/register",
  authLimiter,
  registerValidationRules,
  validate,
  registerUser
);

// Login route
router.post("/login", authLimiter, loginValidationRules, validate, loginUser);

module.exports = router;
