const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

//our connectioon to database
const mongoConnect = require('./utils/database').mongoConnect;

//controllers
const notFoundController = require('./controllers/404');

// app.use(bodyParser.urlencoded({ extended: false }));
//for static (public files) files like js, css
app.use(express.static(path.join(__dirname, 'public')));

//first we look for a user for all routes
app.use((req, res, next) => {
	next();
});

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

//404
app.use(notFoundController.get404Page);

mongoConnect(() => {
	app.listen(3000);
});
