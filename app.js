const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


//our connectioon to database
const db = require('./utils/database');
db.execute("SELECT * FROM products")
    .then((result) => {
        console.log(result[0]);
    })
    .catch((err) => {
        console.log(err);
    });
//controllers
const notFoundController = require('./controllers/404');

app.use(bodyParser.urlencoded({ extended: false }));
//for static (public files) files like js, css
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404
app.use(notFoundController.get404Page);

app.listen(3000, () => {
    console.log("server run at port 3000");
});
