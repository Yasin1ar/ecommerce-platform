const Product = require('./Product');
const Category = require('./Category');

// Define relationships
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = { Product, Category };
