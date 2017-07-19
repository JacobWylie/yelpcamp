const mongoose   = require('mongoose'),
	  Campground = require('./models/campground'),
	  Comment    = require('./models/comment');

let data = [
	{
		name: 'Bass Lake',
		image: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/f4/ca/96/canoe-trip-on-bass-lake.jpg',
		description: 'Fishing, camping, flush toilets',
		location: 'California'
	},
	{
		name: 'Trout Creek',
		image: 'http://www.cascadeclimbers.com/plab/data/517/medium/6285229375_ecb0a4af85_z.jpg',
		description: 'Rock climbing, fishing, primitive',
		location: 'Oregon'
	},
	{
		name: 'Tuolumne Meadows',
		image: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Tuolumne_Meadows_Sunset.jpg',
		description: 'High altitude, crowded, Yosemite',
		location: 'California'
	},
]

// Runs when app starts to clear db and populate with stock data
const seedDB = () => {
	// Removes all campgrounds from DB
	Campground.remove({}, err => {
		if(err) {
			console.log(err);
		}
		console.log('removed campgrounds');
		// Add a few campgrounds to DB
		data.forEach( seed => {
			// Adds new campground from 'data'
			Campground.create(seed, (err, campground) => {
				if(err) {
					console.log(err)
				} else {
					console.log('added campground');
					// Creates a comment
					Comment.create(
						{
							text: 'This place is great, but I wish there was internet.',
							author: 'Homer'
						}, (err, comment) => {
							if(err) {
								console.log(err)
							} else {
								campground.comments.push(comment);
								campground.save();
								console.log('create new comment')
							}
							
						}
					)	
				}
			})
			
			
		})
	})
	// Add a few comments to each campground
}

module.exports = seedDB;
