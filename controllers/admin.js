const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
	res.render('admin/edit-product', {
		pageTitle: 'Add product',
		path: '/admin/add-product',
		editing: false,
		isAuthenticated: req.isLoggedIn,
	});
};

exports.postAddProduct = (req, res, next) => {
	const title = req.body.title;
	const imageUrl = req.body.imageUrl;
	const descriptions = req.body.descriptions;
	const price = req.body.price;
	const product = new Product({
		title: title,
		imageUrl: imageUrl,
		price: price,
		description: descriptions,
		userId: req.user
	});
	product
		.save()
		.then((result) => {
			console.log('product created', result);
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
	Product.findById(productId)
		.then((product) => {
			if (!product) {
				return res.redirect('/');
			}
			res.render('admin/edit-product', {
				pageTitle: 'Add product',
				path: '/admin/edit-product',
				editing: editMode,
				product: product,
				isAuthenticated: req.isLoggedIn,
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
	Product.findById(prodId)
		.then((product) => {
			product.title = updatedTitle;
			product.price = updatedPrice;
			product.imageUrl = updatedImageUrl;
			product.description = updatedDescription;
			return product.save();
		})

		.then((result) => {
			console.log('UPDATED PRODUCT', result);
			res.redirect('/admin/products');
		})
		.catch((error) => console.log(error));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.populate('userId', 'name email')
		.then((products) => {
			console.log(products);
			res.render('admin/products', {
				prods: products,
				pageTitle: 'Admin products',
				path: '/admin/products',
				isAuthenticated: req.isLoggedIn,
			});
		})
		.catch((error) => console.log(error));
	/**with populate with specifie wich column we need to have in our result */
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByIdAndRemove(prodId)
		.then(() => {
			console.log('PRODUCT DESTROYED');
			res.redirect('/admin/products');
		})
		.catch((error) => console.log(error));
};
