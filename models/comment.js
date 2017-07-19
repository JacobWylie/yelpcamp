const mongoose = require('mongoose');

// Comments schema for mongoose

const commentSchema = new mongoose.Schema({
	text: String,
	author: String
});

module.exports = mongoose.model('Comment', commentSchema);