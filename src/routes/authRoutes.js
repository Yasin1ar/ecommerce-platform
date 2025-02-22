const express = require('express');
const { body, validationResult } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');
const authLimiter = require('./middleware/rateLimiter');


const router = express.Router();

// Validation rules for registration
const registerValidationRules = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters'),
  body('role').isIn(['user', 'admin']).withMessage('Invalid role'),
];

// Validation rules for login
const loginValidationRules = [
  body('email').isEmail().withMessage('Enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Registratio
router.post('/register', authLimiter, registerValidationRules, validate, registerUser);

// Login route
router.post('/login', authLimiter, loginValidationRules, validate, loginUser);

module.exports = route