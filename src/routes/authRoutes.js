const express = require("express");
const { registerValidationRules, loginValidationRules, validate } = require('../middleware/authValidator');
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
