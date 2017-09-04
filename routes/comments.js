const express 	 = require('express'),
				   // Uses express router
				   // Merges params from all routes
	  router  	 = express.Router({mergeParams: true}),
	  Campground = require('../models/campground'),
	  Comment 	 = require('../models/comment'),
	  middleware = require('../middleware');


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NEW - comment form page route
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/new', middleware.isLoggedIn, (req, res) => {
	// Find campground by ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			req.flash('error', "Something went wrong");
		} else {
			res.render('comments/new', {campground: foundCampground});
		}
	})
	
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CREATE - Sends new comment to db and displays on page
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post('/', middleware.isLoggedIn, (req, res) => {
	// Lookup camground by ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('/camp/campgrounds');
		} else {
			// Create new comment
			Comment.create(req.body.comment, (err, comment) => {
				if(err) {
					req.flash('error', "Something went wrong");
					console.log(err);
				} else {
					// add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.author.avatar = req.user.avatar;
					// save comment
					comment.save()
					// connect new comment to campground
					foundCampground.comments.push(comment);
					foundCampground.save();
					req.flash('success', "Thanks for commenting!");
					// redirect to campground/:id SHOW page
					res.redirect(`/camp/campgrounds/${foundCampground._id}`);
				}
			})
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  EDIT - Show form to edit comment
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
	Comment.findById(req.params.comment_id, (err, foundComment) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('back');
		} else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  UPDATE - Changes comment
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComments) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('back');
		} else {
			req.flash('success', "You edited your comment");
			res.redirect(`/camp/campgrounds/${req.params.id}`)
		}
	})	
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  DESTROY - Deletes comment
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
	// Find by id and remove
	Comment.findByIdAndRemove(req.params.comment_id, err => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('back');
		} else {
			req.flash('success', "You deleted your comment");
			// Back to campground SHOW
			res.redirect(`/camp/campgrounds/${req.params.id}`)
		}
	})
})



module.exports = router;























