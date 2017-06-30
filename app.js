const express = require('express'),
	  app = express();

// Use .ejs templating
app.set('view engine', 'ejs');

// Serve static js and css
app.use(express.static('public'));

// Home Route
app.get('/', (req, res) => {
	res.render('index');
})

// Campgrounds page route
app.get('/campgrounds', (req, res) => {
	// Temporary campground array before databse
	let campgrounds = [
		{name: "Salmon Creek", image: "https://unsplash.it/500/300/?random"},
		{name: "Trout Land", image: "https://unsplash.it/400/300/?random"},
		{name: "Mountain Place", image: "https://unsplash.it/600/300/?random"}
	];
	res.render('campgrounds', {campgrounds: campgrounds});
})

// All other routes
app.get('*', (req,res) => {
	res.render('error');
})

//local server
app.listen(3000, () => {
	console.log('App running on localhost:3000');
})