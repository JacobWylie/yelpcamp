const express = require('express'),
	  app = express();

// Use .ejs templating
app.set('view engine', 'ejs');

// Serve static js and css
app.use(express.static('public'))

// Home Route
app.get('/', (req, res) => {
	res.render('index')
})

// All other routes
app.get('*', (req,res) => {
	res.render('error')
})

//local server
app.listen(3000, () => {
	console.log('App running on localhost:3000')
})