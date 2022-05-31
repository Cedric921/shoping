const Product = require('../models/product');



exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			pageTitle: 'Shop',
			prods: products,
			path: '/',
			hasProducts: products.length > 0,
			activeShop: true,
			productCSS: true,
		});
	});
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};
