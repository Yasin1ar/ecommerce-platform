// middlewares/productValidator.js

const { body, param, validationResult } = require('express-validator');

// Validate Product Input
exports.validateProduct = [
  body('name')
    .notEmpty().withMessage('Product name is required')
    .isString().withMessage('Product name must be a string')
    .isLength({ min: 3 }).withMessage('Product name must be at least 3 characters long'),
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Validate Product ID (for routes with :id param)
exports.validateProductId = [
  param('id')
    .isInt().withMessage('Product ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
