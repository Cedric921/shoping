const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//our connectioon to database
const dsequelize = require('./utils/database');

//controllers
const notFoundController = require('./controllers/404');
const sequelize = require('./utils/database');

app.use(bodyParser.urlencoded({ extended: false }));
//for static (public files) files like js, css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404
app.use(notFoundController.get404Page);

sequelize
	.sync()
	.then((result) => {
        console.log(result);
        app.listen(3000);
	})
	.catch((error) => {
		console.log(error);
	});
