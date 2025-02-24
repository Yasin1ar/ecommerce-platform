// middlewares/categoryValidator.js

const { body, param, validationResult } = require('express-validator');

// Validate Category Input
exports.validateCategory = [
  body('name')
    .notEmpty().withMessage('Category name is required')
    .isString().withMessage('Category name must be a string')
    .isLength({ min: 3 }).withMessage('Category name must be at least 3 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Validate Category ID (for routes with :id param)
exports.validateCategoryId = [
  param('id')
    .isInt().withMessage('Category ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
