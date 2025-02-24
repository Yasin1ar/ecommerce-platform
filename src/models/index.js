const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = require('./Product');
const Inventory = require('./Inventory');

// Initialize models
const models = {
    Product: Product.init(db, Sequelize),
    Inventory: Inventory.init(db, Sequelize)
};

// Setup associations
Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

// Export models and Sequelize
module.exports = {
    ...models,
    sequelize: db,
    Sequelize
};
