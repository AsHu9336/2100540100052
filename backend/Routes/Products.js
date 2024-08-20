const express = require('express');
const router = express.Router();
const productsController = require('../Services/ProductController');

// Get top N products in a category
router.get('/:categoryname/products', productsController.getTopProducts);

// Get details of a specific product
router.get('/:categoryname/products/:productid', productsController.getProductDetails);

module.exports = router;