const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	let message = req.flash('error');
	message = message[0] ?? null;
	res.render('auth/login', {
		pageTitle: 'Login',
		path: '/login',
		errorMessage: message,
	});
};

exports.getSignup = (req, res, next) => {
	let message = req.flash('error');
	message = message[0] ?? null;
	res.render('auth/signup', {
		pageTitle: 'Signup',
		path: '/signup',
		csrfToken: req.csrfToken(),
		errorMessage: message,
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				req.flash('error', 'Invalid email or password');
				return res.redirect('/login');
			}

			bcrypt
				.compare(password, user.password)
				.then((pwdMatch) => {
					if (pwdMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((error) => {
							console.log(error);
							res.redirect('/');
						});
					}
					res.redirect('/login');
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	if (password !== confirmPassword) {
		req.flash('error', 'Passwords dont match');
		return res.redirect('/signup');
	}
	User.findOne({ email: email })
		.then((userDoc) => {
			if (userDoc) {
				req.flash('error', 'Email already exist');
				return res.redirect('/signup');
			}

			return bcrypt
				.hash(password, 12)
				.then((hashedPassword) => {
					const user = new User({
						email: email,
						password: hashedPassword,
						cart: { items: [] },
					});
					return user.save();
				})
				.then((result) => {
					res.redirect('/login');
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
