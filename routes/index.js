const express  = require('express'),
	  router   = express.Router(),
	  passport = require('passport'),
	  User 	   = require('../models/user');

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
			return res.render("register", {"error": err.message});
		}
		passport.authenticate('local')(req, res, () => {
			req.flash('success', `Welcome to Campground Reviews ${req.body.username}! Thanks for signing up.`);
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
		failureRedirect: '/login',
		successFlash: { type: 'success', message: "Welcome back!"},
		failureFlash: true,
		
	}), (req, res) => {
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  USER LOGOUT ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('/campgrounds');
})



module.exports = router;









