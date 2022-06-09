exports.getLogin = (req, res, next) => {
  isLoggedIn = req.get('Cookie').split(';')[1].trim().split('=')[1] === 'true';
  console.log(req.session.isLoggedIn)
			res.render('auth/login', {
				pageTitle: 'Login',
				path: '/login',
				isAuthenticated: isLoggedIn,
			});
};


exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true')
  req.session.isLoggedIn = true;
	res.redirect('/')
};
