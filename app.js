// Dependencies
const express     	 = require('express'),
	  app         	 = express(),
	  bodyParser  	 = require('body-parser'),
	  mongoose    	 = require('mongoose'),
	  flash			 = require('connect-flash'),
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

// Set which database your server will connect to: DATABASEURL=<databaseURL>
// Set the name of the database to log to console: DATABASENAME=<database name>
// Backup public database for opensource or server failure
const url = "mongodb://heroku_s25v6880:q8lvfeu1097soh3etk5vi057cv@ds153652.mlab.com:53652/heroku_s25v6880"; 
// process.env.DATABASE_URL; // || "mongodb://colt:rusty@ds055525.mongolab.com:55525/yelpcamp"
// Connect to a Mongo DB: Development or Production depending on server
mongoose.connect(url, {useMongoClient: true});
console.log(`Connected to database: ${process.env.DATABASENAME || url}`);
// !!! SET HEROKU DATABASE URL TO MLAB URL !!!
// $ heroku config:set DATEBASEURL=<mlab database url>
// $ heroku config:set DATABASENAME=mlab-sandbox

// Parse incoming request bodies in a middleware before your handlers, 
// available under the req.body property.
app.use(bodyParser.urlencoded({extended: true}));
// Serve static js and css from /public
app.use('/camp', express.static(__dirname + '/public'));
// Use .ejs templating
app.set('view engine', 'ejs');
// Point towards correct views folder
app.set('views','/views');
// Method override for UPDATE http from request
app.use(methodOverride('_method'))
// Use flash alerts
app.use(flash());
// Use momentJS to track time since creation
app.locals.moment = require('moment');

// For testing, clears db and adds a couple generic campgrounds
// const seedDB = require('./seeds');
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
// This will pass flash message through every route
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

// // Express router will prepend route prefixes in the route files
// // Prepends route prefix to url
app.use('/camp', indexRoutes);
app.use('/camp/campgrounds/:id/comments', commentRoutes);
app.use('/camp/campgrounds', campgroundRoutes);

// Everywhere else leads to -> INDEX
app.get('*', (req, res) => {
	res.redirect('/camp/campgrounds')
})

// Set which port your app will run on: PORT=<whichever port you like>
// Connect to server specific port or 3000 if none specified
const port = process.env.PORT || 8083
app.listen(port, process.env.IP, () => {
	console.log(`App is running on port: ${port}`);
})





































