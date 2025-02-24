/**
 * Express-validator middleware configuration for user authentication.
 * Provides validation rules for registration and login endpoints,
 * along with a validation middleware function.
 * 
 * @exports {Object} registerValidationRules - Validation rules for user registration
 * @exports {Object} loginValidationRules - Validation rules for user login
 * @exports {Function} validate - Middleware to check validation results
 */


const { body, validationResult } = require('express-validator');


//validation rules for registration and login

const registerValidationRules = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
];

const loginValidationRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

// validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate
};
