const products = [];

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
	products.push({ title: req.body.title });
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {

	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
	res.render('shop', {
		pageTitle: 'Shop',
		prods: products,
		path: '/',
		hasProducts: products.lastIndexOf > 0,
		activeShop: true,
		productCSS: true
	});
};