const db = require('../utils/database');

const Cart = require('./cart');
//our database now

module.exports = class Product {
	constructor(id, title, imageUrl, descriptions, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.descriptions = descriptions;
		this.price = price;
	}

	save() {
		return db.execute(
			'INSERT INTO products(title, price, imageUrl,description) VALUES (?, ?, ?, ?)',
			[this.title, this.price, this.imageUrl, this.descriptions]
		);
	}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static findById(id) {
		return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
	}
};
