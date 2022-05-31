const express = require("express");
const path = require("path");

const router = express.Router();
const shopController = require('../controllers/shop')

// / => GET public
router.get('/', shopController.getIndex);

// /products => GET public
router.get('/products',shopController.getProducts);

// /cart => GET public
router.get('/cart', shopController.getCart);

// /checkout => GET public
router.get('/checkout',shopController.getCheckout); 

module.exports = router;