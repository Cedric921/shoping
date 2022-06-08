const Product = require('../models/product');
// const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			console.log(products);
			res.render('shop/product-list', {
				prods: products,
				pageTitle: 'All products',
				path: '/products',
			});
		})
		.catch((error) => console.error(error));
	// res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

exports.getProductsById = (req, res, next) => {
	const prodId = req.params.productId;
	Product.findById(prodId)
		.then((product) => {
			res.render('shop/product-detail', {
				product: product,
				pageTitle: product.title,
				path: '/product-detail/' + product.id,
			});
		})
		.catch((error) => console.error(error));
};

exports.getIndex = (req, res, next) => {
	Product.find()
		.then((products) => {
			res.render('shop/index', {
				prods: products,
				pageTitle: 'Shop',
				path: '/',
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

exports.getCart = (req, res, next) => {
	req.user
		.populate('cart.items.productId')
		// .execPopulate()
		.then((user) => {
			const products = user.cart.items;
			res.render('shop/cart', {
				pageTitle: 'Your Cart',
				path: '/cart',
				products: products,
			});
		})
		.catch((error) => console.error(error));
};

exports.postCart = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findById(prodId)
		.then((product) => {
			return req.user.addToCart(product);
		})
		.then((result) => {
			console.log(result);
			res.redirect('/cart');
		})
		.catch((error) => console.error(error));
};

// exports.postCartDeleteProduct = (req, res, next) => {
// 	const prodId = req.body.productId;
// 	req.user
// 		.getCart()
// 		.then((cart) => {
// 			return cart.getProducts({ where: { id: prodId } });
// 		})
// 		.then((preoducts) => {
// 			const product = preoducts[0];
// 			product.cartItem.destroy();
// 		})
// 		.then((result) => {
// 			res.redirect('/cart');
// 		})
// 		.catch((err) => console.error(err));
// };

// exports.postOrder = (req, res, next) => {
// 	let fetchedCart;
// 	req.user
// 		.getCart()
// 		.then((cart) => {
// 			fetchedCart = cart;
// 			return cart.getProducts();
// 		})
// 		.then((products) => {
// 			return req.user.createOrder().then((order) => {
// 				// order.addProducts(products, { through: { quantity } });
// 				return order.addProducts(
// 					products.map((product) => {
// 						product.orderItem = { quantity: product.cartItem.quantity };
// 						return product;
// 					})
// 				);
// 			});
// 		})
// 		.then((result) => {
// 			return fetchedCart.setProducts(null);
// 		})
// 		.then((response) => {
// 			res.redirect('/orders');
// 		})
// 		.catch((error) => console.error(error));
// };

// exports.getOrders = (req, res, next) => {
// 	req.user
// 		.getOrders({ include: ['products']})
// 		.then(orders => {
// 			res.render('shop/orders', {
// 				pageTitle: 'Your Orders',
// 				path: '/orders',
// 				orders: orders
// 			});
// 		})
// 		.catch((err) => console.error(err));

// };

// exports.getCheckout = (req, res, next) => {
// 	res.render('shop/checkout', {
// 		pageTitle: 'Checkout',
// 		path: '/checkout',
// 	});
// };
