const fs = require('fs');
const path = require('path');
//our database now

const p = path.join(
	path.dirname(require.main.filename),
	'data',
	'products.json'
);
const getProductsFromFile = (cb) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) {
			cb([]);
		} else {
			cb(JSON.parse(fileContent));
		}
	});
};

module.exports = class Product {
	constructor(title, imageUrl, descriptions, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.descriptions = descriptions;
		this.price = price;
	}

	save() {
		this.id = Math.random().toString();
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				console.log(err);
			});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}

	static findById(id, cb) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === id);
			cb(product);
		});
	}
};
