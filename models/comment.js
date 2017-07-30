const mongoose = require('mongoose');

// Comments schema for mongoose

const commentSchema = new mongoose.Schema({
	text: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String,
		avatar: String
	}
});

module.exports = mongoose.model('Comment', commentSchema);