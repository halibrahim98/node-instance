const mongoose = require('../database');

let UserSchema = mongoose.Schema({
	email: String,
	name: String,
	password: String,
	token: String,
	userid: String
});

mongoose.model('Users',UserSchema);

module.exports = mongoose.connection.collection('Users');