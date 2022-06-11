const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	const isLoggedIn = req.session.isLoggedIn;
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: isLoggedIn,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById('62a100a4c1f455a430556d6d')
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			console.log('user logged in', req.session);
			res.redirect('/');
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};
