const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: req.session.isLoggedIn,
	});
};

exports.getSignup = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};

exports.postLogin = (req, res, next) => {
	User.findById('62a4520bfa2e37e0ecde2a63')
		.then((user) => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			console.log(req.session);
			req.session.save((error) => {
				console.log(error);
				res.redirect('/');
			});
		})
		.catch((err) => console.log(err));
};


exports.postSignup = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};


exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};


