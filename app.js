const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

//our connectioon to database
const mongoose = require('mongoose');

//controllers
// const notFoundController = require('./controllers/404');

app.use(bodyParser.urlencoded({ extended: false }));
//for static (public files) files like js, css
app.use(express.static(path.join(__dirname, 'public')));

//first we look for a user for all routes
app.use((req, res, next) => {
	next();
});

// app.use('/admin', adminRoutes);
// // app.use(shopRoutes);

// //404
// app.use(notFoundController.get404Page);

const monngodb_url =
	'mongodb+srv://cedric921:zehxQ3id!$WfJx5@cluster0.xosd8.mongodb.net/shop?retryWrites=true&w=majority';

mongoose
	.connect(monngodb_url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('mongodb is connected');
	})
	.catch((error) => {
		console.log('mondb not connected');
		console.log(error);
	});
