const mongoose = require('mongoose');

// Campground schema for mongoose

let campgroundSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	image: String
});

module.exports = mongoose.model('Campground', campgroundSchema);
