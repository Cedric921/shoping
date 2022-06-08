const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		requiered: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
});

// const getDb = require('../utils/database').getDb;

// class Product {
// 	constructor(title, imageUrl, price, description) {
// 		this.title = title;
// 		this.imageUrl = imageUrl;
// 		this.price = price;
// 		this.description = description;
// 	}
// 	save() {
// 		const db = getDb();
// 		return db.collection('products')
// 			.insertOne(this)
// 			.then((response) => {
// 				console.log(response)
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			});
// 	}
// }

// module.exports = Product;
