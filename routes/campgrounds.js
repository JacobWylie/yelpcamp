const express = require('express'),
	  router  = express.Router(),
	  Campground = require('../models/campground');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// INDEX - Campgrounds page route
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/', (req, res) => {
	// Get campgrounds from db
	Campground.find({}, (err, campgrounds) => {
		if(err) {
			console.log('error');
		} else {
			// render campgrounds to page from db
			res.render('campgrounds/index', {
				// pass campgrounds to page
				campgrounds: campgrounds,
				// pass user data for current logged on user
				// added to all routes with middleware 
				// currentUser: req.user
			});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// NEW - New campground form page route
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/new', isLoggedIn, (req, res) => res.render('campgrounds/new'));

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CREATE - Add new campground to /campgrounds
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post('/', isLoggedIn, (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let description = req.body.description;
	let location = req.body.location;
	let image = req.body.image;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	// new campground object
	let newCampground = {
		name: name, 
		description: description, 
		location: location, 
		image: image, 
		author: author
	};
	// create a new campground and save to db
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err) {
			console.log(err);
		} else {
			//redirect back to campgrounds page
			res.redirect('/campgrounds');
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// SHOW - Display info for individual campground
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/:id', (req, res) => {
	// Find campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec( (err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
			// Render show template for selected campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  EDIT - Form to edit campground info
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
	// Find the specific campground
	Campground.findById(req.params.id, (err, foundCampground) => {
		// Load edit form and passes campground information to form
		res.render('campgrounds/edit', {campground: foundCampground});
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  UPDATE - Push edited campground data to db
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.put('/:id', checkCampgroundOwnership, (req, res) => {
	// Find and update the correct campground in db
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			// Redirect to show page
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  DESTROY - Removes campground from db
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, err => {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds')
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

// Check to see if user has permissions for campground routes
function checkCampgroundOwnership(req, res, next) {
	// Is User logged in
	if(req.isAuthenticated()) {		
		// Find campground
		Campground.findById(req.params.id, (err, foundCampground) => {
			if(err) {
				res.redirect('back');
			} else {
				// Does user own campground
				if(foundCampground.author.id.equals(req.user._id)) {
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















