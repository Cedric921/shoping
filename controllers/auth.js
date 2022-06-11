const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
		isAuthenticated: false,
	});
};

exports.getSignup = (req, res, next) => {
	res.render('auth/signup', {
		pageTitle: 'Signup',
		path: '/signup',
		isAuthenticated: false,
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
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				return res.render('/login');
			}
			const user = new User({
				email: email,
				password: password,
			});
		})
		.catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};
