const express  = require('express'),
	  router   = express.Router(),
	  passport = require('passport'),
	  User 	   = require('../models/user'),
	  Campground = require('../models/campground');

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
	// Build new user object from from data
	let newUser = new User({
		username: req.body.username,
		email: req.body.email,
		avatar: req.body.avatar
	});
	// Check if new user registers with admin code
	if(req.body.adminCode === 'admin') {
		newUser.isAdmin = true;
	};
	// Creates new user account
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

// Logs the user out 
router.get('/logout', (req, res) => {
	// Passport method
	req.logout();
	req.flash('success', 'You are now logged out');
	res.redirect('back');
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  USER PROFILE PAGE
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Takes you to the users public profile page
router.get('/users/:id', (req, res) => {
	// Find the user whos profile was selected
	User.findById(req.params.id, (err, foundUser) => {
		if(err) {
			req.flash('error', 'There was an error finding that user');
			res.redirect('back');
		}
		// Find campgrounds associated to the user
		Campground.find().where('author.id').equals(foundUser._id).exec( (err, campgrounds) => {
			if(err) {
				req.flash('error', 'There was an error finding that user');
				res.redirect('back');
			}
			res.render('users/show', {user: foundUser, campgrounds: campgrounds});			
		})
	})
})





module.exports = router;



























