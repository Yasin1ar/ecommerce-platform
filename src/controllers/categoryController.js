// controllers/categoryController.js

const Category = require('../models/Category');
const AppError = require('../utils/AppError');

// Create Category
exports.createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

// Get All Categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

// Get Single Category
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

// Update Category
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }
    await category.update(req.body);
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

// Delete Category
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return next(new AppError('Category not found', 404));
    }
    await category.destroy();
    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
