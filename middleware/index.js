const Campground = require('../models/campground'),
	  Comment 	 = require('../models/comment');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// All Middleware goes here
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Empty object to hold functions for export
const middlewareObj = {};

// Check if a user is logged in
middlewareObj.isLoggedIn = (req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash('error', 'You must be logged in to do that.');
	res.redirect('/login');
}

// Check to see if user has permissions for campground routes
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
	// Is User logged in
	if(req.isAuthenticated()) {		
		// Find campground
		Campground.findById(req.params.id, (err, foundCampground) => {
			if(err) {
				req.flash('error', 'Campground not found.');
				res.redirect('back');
			} else {
				// Does user own campground
				if(foundCampground.author.id.equals(req.user._id)) {
					next()
				} else {
					req.flash('error', "You don't have permission to do that.");
					res.redirect('back');
				}
			}
		})
	} else {
		req.flash('error', "You must be logged in to do that.")
		res.redirect('back');
	}
}	

// Check to see if user owns comment
middlewareObj.checkCommentOwnership = (req, res, next) => {
	// Is User logged in
	if(req.isAuthenticated()) {		
		// Find comment
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err) {
				req.flash('error', "Something went wrong");
				res.redirect('back');
			} else {
				// Does user own comment
				if(foundComment.author.id.equals(req.user.id)) {
					next()
				} else {
					res.redirect('back');
				}
			}
		})
	} else {
		req.flash('error', "You must be logged in to do that.")
		res.redirect('back');
	}
}


module.exports = middlewareObj;




























