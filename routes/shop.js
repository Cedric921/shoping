const express = require("express");
const path = require("path");

const router = express.Router();

const rootDir = require('../utils/path');
const adminData = require('./admin');
const products = adminData.products;
router.get('/', (req, res, next) => {
    console.log(adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', { pageTitle: "Shop",prods: products, path : '/' });
});

module.exports = router;