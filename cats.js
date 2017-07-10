const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat_app', {useMongoClient: true});

const catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// add cats to db

// let george = new Cat({
// 	name: "Norris",
// 	age: 20,
// 	temperament: "nice"
// });

// george.save( (err, cat) => {
// 	if(err) {
// 		console.log('Something went wrong');
// 	} else {
// 		console.log('We just saved a cat to the db');
// 		console.log(cat);
// 	}
// });

// easier way than above to add and save new data to db

Cat.create({
	name: "Chucky",
	age: 15,
	temperament: "cool"
}, (err, cat) => {
	if(err) {
		console.log(err);
	} else {
		console.log("cat added: " + cat)
	}
})


// retrieve cats from db
Cat.find({}, (err, cats) => {
	if(err) {
		console.log('Oh No');
		console.log(err);
	} else {
		console.log(cats)
	}
});


