// routes/categoryRoutes.js

const express = require('express');
const categoryController = require('../controllers/categoryController');
const { validateCategory, validateCategoryId } = require('../middleware/categoryValidator');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.post('/', authorize(['admin']), validateCategory, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', validateCategoryId, categoryController.getCategoryById);
router.put('/:id', authorize(['admin']), [validateCategoryId, validateCategory], categoryController.updateCategory);
router.delete('/:id', authorize(['admin']), validateCategoryId, categoryController.deleteCategory);

module.exports = router;
