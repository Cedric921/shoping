const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		formsCss: true,
		productCss: true,
		activeAddProduct: true,
	});
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const descriptions = req.body.descriptions;
    const price = req.body.price
	const product = new Product(title, imageUrl, descriptions, price);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll((products) => {
		res.render('admin/products', {
			prods: products,
			pageTitle: 'Admin products',
			path: '/admin/products',
		});
	});
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};
