// Dependencies
const express     	 = require('express'),
	  app         	 = express(),
	  bodyParser  	 = require('body-parser'),
	  mongoose    	 = require('mongoose'),
	  passport       = require('passport'),
	  LocalStrategy  = require('passport-local'),
	  methodOverride = require('method-override');

// Mongoose Models
const Campground = require('./models/campground'),
	  Comment    = require('./models/comment'),
	  User	 	 = require('./models/user');

// Routes
const commentRoutes    = require('./routes/comments'),
	  campgroundRoutes = require('./routes/campgrounds'),
	  indexRoutes	   = require('./routes/index');

// For testing, clears db and adds a couple generic campgrounds
const seedDB = require('./seeds');

// Use local database 
mongoose.connect('mongodb://localhost/yelpcamp', {useMongoClient: true});
// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
app.use(bodyParser.urlencoded({extended: true}));
// Serve static js and css from /public
app.use(express.static(__dirname + '/public'));
// Use .ejs templating
app.set('view engine', 'ejs');
// Method override for UPDATE http from request
app.use(methodOverride('_method'))


// Clears the database and populates with stock data for testing
// seedDB();


// Passport JS Configuration
app.use(require('express-session')({
	secret: 'Check yourself before you wreck yourself',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// This will pass currentUser object/data to every route
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// Tells our app to use the seperate route files
// Appends route prefix to url
app.use('/', indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);


//local server
app.listen(3000, () => console.log('App running on localhost:3000'));





































