const express = require('express'),
	  app = express(),
	  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
// Use .ejs templating
app.set('view engine', 'ejs');

	// Temporary campground array before databse
	let campgrounds = [
		{name: "Salmon Creek", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=765"},
		{name: "Trout Land", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=786"},
		{name: "Mountain Place", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=770"},
		{name: "Salmon Creek", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=765"},
		{name: "Trout Land", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=786"},
		{name: "Mountain Place", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=770"},
		{name: "Salmon Creek", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=765"},
		{name: "Trout Land", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=786"},
		{name: "Mountain Place", description: "lorem ipsum...", image: "https://unsplash.it/400/300?image=770"}
	];


// Serve static js and css from /public
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
	res.render('index');
})

// Campgrounds page route
app.get('/campgrounds', (req, res) => {
	res.render('campgrounds', {campgrounds: campgrounds});
})

// New campground form page route
app.get('/campgrounds/new', (req, res) => {
	res.render('new.ejs');
})

// POST route - new campground to /campgrounds
app.post('/campgrounds', (req, res) => {
	// get data from form and add to campgrounds array
	let name = req.body.name;
	let image = req.body.image;
	let description = req.body.description;
	let newCampground = {name: name, description: description, image: image};
	campgrounds.push(newCampground);
	//redirect back to campgrounds page
	res.redirect('/campgrounds')
})

// All other routes
app.get('*', (req,res) => {
	res.render('error');
})

//local server
app.listen(3000, () => {
	console.log('App running on localhost:3000');
})