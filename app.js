const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//our connectioon to database
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');

//controllers
const notFoundController = require('./controllers/404');

app.use(bodyParser.urlencoded({ extended: false }));
//for static (public files) files like js, css
app.use(express.static(path.join(__dirname, 'public')));

//first we look for a user for all routes
app.use((req, res, next) => {
	User.findOne({ where: { id: 1 } })
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((error) => console.error(error));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404
app.use(notFoundController.get404Page);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

sequelize
	.sync({ force: false })
	.then((result) => {
		return User.findOne({ where: { id: 1 } });
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: 'vb', email: 'test@test.com' });
		}
		return user;
	})
	.then((response) => {
		// console.log(response);
		app.listen(3000);
	})
	.catch((error) => {
		console.log(error);
	});
