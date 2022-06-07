const express = require('express');
const path = require('path');

const router = express.Router();
const shopController = require('../controllers/shop');

// / => GET public
router.get('/', shopController.getIndex);

// /products => GET public
router.get('/products', shopController.getProducts);

// /products/123 => GET public
router.get('/products/:productId', shopController.getProductsById);

// /cart => GET public
router.get('/cart', shopController.getCart);

// /cart => POST private
router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

// /orders => GET public
router.get('/orders', shopController.getOrders);

// /checkout => GET public
router.get('/checkout', shopController.getCheckout);

module.exports = router;
