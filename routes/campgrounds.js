const express = require('express'),
	  router  = express.Router(),
	  Campground = require('../models/campground'),
	  middleware = require('../middleware');

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// INDEX - Campgrounds page route
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/', (req, res) => {
	// Get campgrounds from db
	Campground.find({}, (err, campgrounds) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('back');
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
router.get('/new', middleware.isLoggedIn, (req, res) => res.render('campgrounds/new'));

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// CREATE - Add new campground to /campgrounds
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.post('/', middleware.isLoggedIn, (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let description = req.body.description;
	let price = req.body.price;
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
		price: price, 
		location: location, 
		image: image, 
		author: author
	};
	// create a new campground and save to db
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('back');
		} else {
			req.flash('success', "You added a new campground!");
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
			req.flash('error', "Something went wrong");
			res.redirect('back');
		} else {
			// Render show template for selected campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  EDIT - Form to edit campground info
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
	// Find the specific campground
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('back');
		} else {
			// Load edit form and passes campground information to form
			res.render('campgrounds/edit', {campground: foundCampground});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  UPDATE - Push edited campground data to db
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	// Find and update the correct campground in db
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('/campgrounds');
		} else {
			req.flash('success', "You updated your campground.")
			// Redirect to show page
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  DESTROY - Removes campground from db
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, err => {
		if(err) {
			req.flash('error', "Something went wrong");
			res.redirect('/campgrounds');
		} else {
			req.flash('success', "You deleted your campground.")
			res.redirect('/campgrounds')
		}
	})
})




module.exports = router;















