const express = require("express");
const path = require("path");

const router = express.Router();
const shopController = require('../controllers/shop')

// / => GET
router.get('/', shopController.getProducts);

/**
 *  GET /products 
 *  GET public
 */
router.get('/products',);

/**
 *  GET /cart 
 *  GET public
 */
router.get('/cart',);

/**
 *  GET /products 
 *  GET public
 */
router.get('/checkout',); 

module.exports = router;