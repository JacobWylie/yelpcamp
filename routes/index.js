const express  = require('express'),
	  router   = express.Router(),
	  passport = require('passport'),
	  User 	   = require('../models/comment');

// ROOT Route
router.get('/', (req, res) => res.render('landing'));

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  USER SIGN UP ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Show register form
router.get('/register', (req, res) => {
	res.render('register');
});

// Handles sign up logic
router.post('/register', (req, res) => {
	let newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, () => {
			res.redirect('/campgrounds');
		})
	});
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  USER LOGIN ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Show login form
router.get('/login', (req, res) => {
	res.render('login');
})

// Handles login logic
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	}), (req, res) => {
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  USER LOGOUT ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/campgrounds');
})


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  MIDDLEWARE
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Check if a user is logged in
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}



module.exports = router;









