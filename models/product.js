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

	save() {}

	static deleteById(id) {}

	static fetchAll() {
		return db.execute('SELECT * FROM products');
	}

	static findById(id) {}
};
