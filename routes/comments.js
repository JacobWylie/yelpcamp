const express 	 = require('express'),
				   // Uses express router
				   // Merges params from all routes
	  router  	 = express.Router({mergeParams: true}),
	  Campground = require('../models/campground'),
	  Comment 	 = require('../models/comment');


// Comments New
router.get('/new', isLoggedIn, (req, res) => {
	// Find campground by ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {campground: foundCampground});
		}
	})
	
})

// Comments Create
router.post('/', isLoggedIn, (req, res) => {
	// Lookup camground by ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			// Create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					console.log(err);
				} else {
					// connect new comment to campground
					foundCampground.comments.push(comment);
					foundCampground.save();
					// redirect to campground/:id SHOW page
					res.redirect(`/campgrounds/${foundCampground._id}`);
				}
			})
		}
	})
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