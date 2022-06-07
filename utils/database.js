const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = callback => {
	MongoClient
		.connect(
			'mongodb+srv://cedric921:zehxQ3id!$WfJx5@cluster0.xosd8.mongodb.net/?retryWrites=true&w=majority'
		)
		.then((client) => {
			console.log('connected');
			callback(client);
		})
		.catch((err) => console.error(err));
};

module.exports = mongoConnect;