const express = require("express");
const path = require('path');

const router = express.Router();

const adminController = require('../controllers/admin');

// // admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// admin/products => GET
router.get('/products', adminController.getProducts);

// admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// admin/edit-product/1234 GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// admin/edit-product POST
router.post('/edit-product', adminController.postEditProduct);

// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;