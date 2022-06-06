const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		editing: false,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const descriptions = req.body.descriptions;
	const price = req.body.price;
	req.user.createProduct({
		title: title,
		imageUrl: imageUrl,
		price: price,
		description: descriptions,
	})
	// Product.create({
	// 	title: title,
	// 	imageUrl: imageUrl,
	// 	price: price,
	// 	description: descriptions,
	// 	userId: req.user.id
	// })
		.then((result) => {
			console.log('product created');
			res.redirect('/admin/products');
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		res.redirect('/');
	}
	const productId = req.params.productId;
	Product.findOne({ where: { id: productId } })
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Add product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product,
			});
		})
		.catch((error) => console.log(error));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDescription = req.body.descriptions;

	Product.findOne({ where: { id: prodId } })
		.then((product) => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.imageUrl = updatedImageUrl;
			product.description = updatedDescription;
			product.userId = req.user.id;
			return product.save();
		})
		.then((result) => {
			console.log('UPDATED PRODUCT', result);
			res.redirect('/admin/products');
		})
		.catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin products',
				path: '/admin/products',
			});
		})
		.catch((error) => console.log(error));
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findOne({ where: { id: prodId } })
		.then((product) => {
			return product.destroy();
		})
		.then(result => {
			console.log("PRODUCT DESTROYED", result);
			res.redirect('/admin/products');
		})
		.catch((error) => console.log(error));
};
