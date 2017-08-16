const express    = require('express'),
	  router     = express.Router(),
	  Campground = require('../models/campground'),
	  middleware = require('../middleware'),
	  geocoder	 = require('geocoder');


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// INDEX - Campgrounds page route
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/', (req, res) => {
	// If search results are empty
	const results = null;
	// Check to see if user submitted a search
	if(req.query.search) {
		// Turns search into a regular expression?
		const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		// Get campgrounds from db
		Campground.find({
			// Searches db campground names for regex/user search
			name: regex
		}, (err, campgrounds) => {
			if(err) {
				req.flash('error', "Something went wrong");
				res.redirect('back');
			} else {
				// render campgrounds to page from db
				res.render('campgrounds', {
					// pass campgrounds to page
					campgrounds: campgrounds,
					// Tell the user how many results they had and search params
					results: `Your search for "${req.query.search}" returned ${campgrounds.length} result(s)...`
					// pass user data for current logged on user
					// added to all routes with middleware 
					// currentUser: req.user
				});
			}
		})
	// or Show all campgrounds
	} else { 
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
					results: ''
					// pass user data for current logged on user
					// added to all routes with middleware 
					// currentUser: req.user
				});
			}
		})
	}
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
	let image = req.body.image;
	let author = {
		id: req.user._id,
		username: req.user.username,
		avatar: req.user.avatar
	}
	// Enables Google map api to be used
	geocoder.geocode(req.body.location, (err, data) => {
		let lat = data.results[0].geometry.location.lat;
		let lng = data.results[0].geometry.location.lng;
		let location = data.results[0].formatted_address;
			// new campground object
		let newCampground = {
			name: name, 
			description: description,
			price: price,  
			image: image, 
			author: author,
			avatar: req.user.avatar,
			location: location,
			lat: lat,
			lng: lng
		};
		// create a new campground and save to db
		Campground.create(newCampground, (err, newlyCreated) => {
			if(err) {
				req.flash('error', "Something went wrong");
				res.redirect('back');
			} else {
				req.flash('success', "You added a new campground!");
				//redirect back to campgrounds page
				res.redirect(`/campgrounds/${newlyCreated._id}`);
			}
		})
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
	// Allows Google map api to update data
	geocoder.geocode(req.body.location, (err, data) => {
		let lat = data.results[0].geometry.location.lat;
		let lng = data.results[0].geometry.location.lng;
		let location = data.results[0].formatted_address;
		let newData = {
			name: req.body.name, 
			description: req.body.description,
			price: req.body.price,  
			image: req.body.image, 
			author: {
				id: req.user._id,
				username: req.user.username,
				avatar: req.user.avatar
			},
			location: location,
			lat: lat,
			lng: lng
		}
		// Find and update the correct campground in db
		Campground.findByIdAndUpdate(req.params.id, {$set: newData}, (err, updatedCampground) => {
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


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  For mongo db query search
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


module.exports = router;











































