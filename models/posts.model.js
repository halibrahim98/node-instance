const mongoose = require('../database');

let PostSchema = mongoose.Schema({
	postid: String,
	createdOn: String,
	content: String,
	title: String,
	authorid: String,
	authorname: String
});

mongoose.model('Posts',PostSchema);

module.exports = mongoose.connection.collection('Posts');