const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		formsCss: true,
		productCss: true,
		activeAddProduct: true,
	});
};

exports.postAddProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop', {
			pageTitle: 'Shop',
			prods: products,
			path: '/',
			hasProducts: products.lastIndexOf > 0,
			activeShop: true,
			productCSS: true,
		});
	});
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};
