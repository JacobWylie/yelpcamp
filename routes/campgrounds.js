const express = require('express'),
	  router  = express.Router(),
	  Campground = require('../models/campground');


// INDEX - Campgrounds page route
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

// NEW - New campground form page route
router.get('/new', (req, res) => res.render('campgrounds/new'));

// CREATE - Add new campground to /campgrounds
router.post('/', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let description = req.body.description;
	let location = req.body.location;
	let image = req.body.image;
	let newCampground = {name: name, description: description, location: location, image: image};
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

// SHOW - Display info for individual campground
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

module.exports = router;















