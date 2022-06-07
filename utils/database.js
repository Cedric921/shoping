const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect(
		'mongodb+srv://cedric921:zehxQ3id!$WfJx5@cluster0.xosd8.mongodb.net/shop?retryWrites=true&w=majority'
	)
		.then((client) => {
			console.log('connected');
			_db = client.db();
			callback();
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const getDb = () => {
	if (_db) {
		return _db;
	}
	throw 'no db found';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
