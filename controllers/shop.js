const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/product-list', {
			prods: products,
			pageTitle: 'All products',
			path: '/products',
		});
	});
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getProductsById = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId, (result) => {
		console.log(result);
		res.render('shop/product-detail', {
			product: result,
			pageTitle: result.title,
			path: 'product-detail'+ result.id
		})
	});
}

exports.getIndex = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('shop/index', {
			prods: products,
			pageTitle: 'Shop',
			path: '/',
		});
	});
};


exports.getCart = (req, res, next) => {
	res.render('shop/cart', {
		pageTitle: 'Your Cart',
		path: '/cart',
	});
}

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	console.log(prodId);
	res.redirect('/cart');
	// res.render('shop/cart', {});
}

exports.getOrders = (req, res, next) => {
	res.render('shop/orders', {
		pageTitle: 'Your Orders',
		path: '/orders',
	});
};

exports.getCheckout = (req, res, next) => {
	res.render('shop/checkout', {
		pageTitle: 'Checkout',
		path: '/checkout'
	})
}