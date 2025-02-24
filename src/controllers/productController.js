// controllers/productController.js

const Product = require('../models/Product');
const AppError = require('../utils/AppError');

// Create Product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

// Get All Products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    console.error("products");
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

// Get Single Product
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    await product.update(req.body);
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

// Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    await product.destroy();
    res.status(204).json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};
