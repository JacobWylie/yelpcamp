const express    = require('express'),
	  app        = express(),
	  bodyParser = require('body-parser'),
	  mongoose   = require('mongoose'),
	  Campground = require('./models/campground'),
	  Comment    = require('./models/comment'),
	  seedDB 	 = require('./seeds');

// Use local database 
mongoose.connect('mongodb://localhost/yelpcamp', {useMongoClient: true});
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
app.use(bodyParser.urlencoded({extended: true}));
// Serve static js and css from /public
app.use(express.static(__dirname + '/public'));
// Use .ejs templating
app.set('view engine', 'ejs');

// Clears the database and populates with stock data for testing
seedDB();

// Landing page route
app.get('/', (req, res) => res.render('landing'));

// INDEX - Campgrounds page route
app.get('/campgrounds', (req, res) => {
	// Get campgrounds from db
	Campground.find({}, (err, campgrounds) => {
		if(err) {
			console.log('error');
		} else {
			// render campgrounds to page from db
			res.render('campgrounds/index', {campgrounds: campgrounds});
		}
	})
})

// NEW - New campground form page route
app.get('/campgrounds/new', (req, res) => res.render('campgrounds/new'));

// CREATE - Add new campground to /campgrounds
app.post('/campgrounds', (req, res) => {
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
app.get('/campgrounds/:id', (req, res) => {
	// Find campground with provided ID
	Campground.findById(req.params.id).populate('comments').exec( (err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
			console.log(foundCampground)
			// Render show template for selected campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	})
})

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  COMMENTS ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.get('/campgrounds/:id/comments/new', (req, res) => {
	// Find campground by ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {campground: foundCampground});
		}
	})
	
})

app.post('/campgrounds/:id/comments', (req, res) => {
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



// All other routes go to error page
app.get('*', (req,res) => res.render('error'));

//local server
app.listen(3000, () => console.log('App running on localhost:3000'));





































