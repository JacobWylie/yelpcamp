const mongoose = require('mongoose'),
	  Campground = require('./models/campground');

let data = [
	{
		name: 'Bass Lake',
		image: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/f4/ca/96/canoe-trip-on-bass-lake.jpg',
		description: 'Fishing, camping, flush toilets'
	},
	{
		name: 'Trout Creek',
		image: 'http://www.cascadeclimbers.com/plab/data/517/medium/6285229375_ecb0a4af85_z.jpg',
		description: 'Rock climbing, fishing, primitive'
	},
	{
		name: 'Tuolumne Meadows',
		image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Tuolumne_Meadows_Sunset.jpg',
		description: 'High altitude, crowded, Yosemite'
	},
]

// Runs when app starts to clear db and populate with stock data
const seedDB = () => {
	// Clears campground DB
	Campground.remove({}, err => {
		if(err) {
			console.log(err);
		}
		console.log('removed campgrounds');
		// Add a few campgrounds to DB
		data.forEach( seed => {
			Campground.create(seed, (err, data) => err ? console.log(err) : console.log('added campground'))	
		})
	})
	// Add a few comments to each campground
}

module.exports = seedDB;
