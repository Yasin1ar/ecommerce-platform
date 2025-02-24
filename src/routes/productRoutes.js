// routes/productRoutes.js

const express = require('express');
const productController = require('../controllers/productController');
const { validateProduct, validateProductId } = require('../middleware/productValidator');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.post('/', authorize(['admin']), validateProduct, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', validateProductId, productController.getProductById);
router.put('/:id', authorize(['admin']), [validateProductId, validateProduct], productController.updateProduct);
router.delete('/:id', authorize(['admin']), validateProductId, productController.deleteProduct);

module.exports = router;
