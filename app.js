const express    = require('express'),
	  app        = express(),
	  bodyParser = require('body-parser'),
	  mongoose   = require('mongoose');

// Use yelpcamp database 
mongoose.connect('mongodb://localhost/yelpcamp', {useMongoClient: true});
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
app.use(bodyParser.urlencoded({extended: true}));
// Serve static js and css from /public
app.use(express.static('public'));
// Use .ejs templating
app.set('view engine', 'ejs');

// Mongoose schema setup
let campgroundSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	image: String
});
const Campground = mongoose.model('Campground', campgroundSchema);


// Home Route
app.get('/', (req, res) => {
	res.render('landing');
})

// INDEX - Campgrounds page route
app.get('/campgrounds', (req, res) => {
	// Get campgrounds from db
	Campground.find({}, (err, campgrounds) => {
		if(err) {
			console.log('error');
		} else {
			// render campgrounds to page from db
			res.render('index', {campgrounds: campgrounds});
		}
	})
})

// NEW - New campground form page route
app.get('/campgrounds/new', (req, res) => {
	res.render('new');
})

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
			res.redirect('/campgrounds')
		}
	})
})

// SHOW - Display info for individual campground
app.get('/campgrounds/:id', (req, res) => {
	// Find campground with provided ID
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err) {
			console.log(err);
		} else {
			// Render show template for selected campground
			res.render('show', {campground: foundCampground});
		}
	})
})

// All other routes go to error page
app.get('*', (req,res) => {
	res.render('error');
})

//local server
app.listen(3000, () => {
	console.log('App running on localhost:3000');
})














