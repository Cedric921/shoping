const express = require('express');
const path = require('path');

const router = express.Router();
const shopController = require('../controllers/shop');
//middleware
const isAuth = require('../middleware/gard');

// / => GET public
router.get('/', shopController.getIndex);

// /products => GET public
router.get('/products', shopController.getProducts);

// /products/123 => GET public
router.get('/products/:productId', shopController.getProductsById);

// /cart => GET public
router.get('/cart', isAuth, shopController.getCart);

// /cart => POST private
router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

// /orders => GET public
router.get('/orders', isAuth, shopController.getOrders);

// // /checkout => GET public
// router.get('/checkout', shopController.getCheckout);

module.exports = router;
