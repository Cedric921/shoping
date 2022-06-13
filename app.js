const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb://localhost:27017/shop';

const app = express();
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth.js');
//user model
const User = require('./models/user');

//controllers
const notFoundController = require('./controllers/404');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'cedric karungu geek secret',
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

//first we look for a user for all routes
// app.use((req, res, next) => {
// 	User.findById('62a6cdeab202d5cbaf5481bc')
// 		.then((user) => {
// 			req.user = user;
// 			next();
// 		})
// 		.catch((error) => console.log(error));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//404
app.use(notFoundController.get404Page);

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('mongodb is connected');
		app.listen(3000);
	})
	.catch((error) => {
		console.log('mondb not connected');
		console.log(error);
	});
