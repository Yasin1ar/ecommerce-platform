const { Product, Category } = require('../models');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const product = await Product.create({ name, description, price, categoryId });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get All Products (with Pagination and Filtering)
exports.getProducts = async (req, res) => {
  const { page = 1, limit = 10, category } = req.query;
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    include: Category,
    where: {}
  };

  if (category) {
    options.where.categoryId = category;
  }

  try {
    const products = await Product.findAll(options);
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Category });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    await product.update(req.body);
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    await product.destroy();
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
