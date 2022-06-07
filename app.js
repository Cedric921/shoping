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

//models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-items');

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
Product.belongsToMany(Cart, { through: CartItem }); //optional
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem }); //optionnal

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
	.then((user) => {
		// console.log(user);
		return user.createCart();
	})
	.then((cart) => {
		app.listen(3000);
	})
	.catch((error) => {
		console.log(error);
	});
