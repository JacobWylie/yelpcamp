const express 	 = require('express'),
				   // Uses express router
				   // Merges params from all routes
	  router  	 = express.Router({mergeParams: true}),
	  Campground = require('../models/campground'),
	  Comment 	 = require('../models/comment');


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NEW - comment form page route
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CREATE - Sends new comment to db and displays on page
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save()
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
//  EDIT - Show form to edit comment
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/:comment_id/edit', (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  UPDATE - Changes comment
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.put('/:comment_id', (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComments) => {
		if(err) {
			res.redirect('back');
		} else {
			res.redirect(`/campgrounds/${req.params.id}`)
		}
	})	
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  DESTROY - Deletes comment
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
	// Find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, err => {
		if(err) {
			res.redirect('back');
		} else {
			// Back to campground SHOW
			res.redirect(`/campgrounds/${req.params.id}`)
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

// Check to see if user owns comment
function checkCommentOwnership(req, res, next) {
	// Is User logged in
	if(req.isAuthenticated()) {		
		// Find comment
		Comment.findById(req.params.comment_id, (err, foundComment) => {
			if(err) {
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
		res.redirect('back');
	}
}

module.exports = router;























