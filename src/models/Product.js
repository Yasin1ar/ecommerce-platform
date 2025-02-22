const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Product name is required' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      isFloat: { msg: 'Price must be a number' },
      min: { args: [0], msg: 'Price cannot be negative' }
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});


Product.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

module.exports = Product;