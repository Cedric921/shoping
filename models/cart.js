const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
	static addProduct(id, productPrice) {
		//get or fetch all items present in the cart
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}

			//verify if the product exist on the cart
			const existingProductIndex = cart.products.findIndex(
				(prod) => prod.id === id
			);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct;

			//add a new product / increase quantity
			if (existingProduct) {
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				//we update the product at the index of our product
				cart.products = [...cart.products];
				cart.products[existingProductIndex] = updatedProduct;
			} else {
				updatedProduct = { id: id, qty: 1 };
				//we add the new product to our cart if no exist
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return;
			}
			const updatedCart = { ...cart };
			const product = updatedCart.products.find((prod) => prod.id === id);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(
				(prod) => prod.id === id
			);
			cart.totalPrice = productPrice - productPrice * productQty;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}
};
