const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://halibrahim:ohhaimark@cluster0-itnms.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbUrl,{useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", () => {
    console.error("Error occurred from the database!");
});

db.once("open", () => {
    console.log("Successfully connected to the database!");
});

module.exports = mongoose;