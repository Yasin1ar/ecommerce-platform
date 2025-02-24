const express = require('express');
const authorize = require('../middleware/authorize');
const inventoryController = require('../controllers/inventoryController');

const router = express.Router();

// Admin-only endpoint to update inventory
router.post('/inventory/update', authorize(['admin']), inventoryController.updateInventory);

// Get inventory for a specific product
router.get('/inventory/:productId', inventoryController.getInventory);

module.exports = router;
