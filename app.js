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
//model
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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

//relation
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
	.sync({ force: true })
	.then((result) => {
		return User.findOne({ where: { id: 1 } });
	})
	.then((user) => {
		if (!user) {
			return User.create({ name: 'vb', email: 'test@test.com' });
		}
		return user;
	})
	.then((user) => {
		// console.log(user);
		app.listen(3000);
	})
	.catch((error) => {
		console.log(error);
	});
