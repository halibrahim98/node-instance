const express = require('express');
const userRoutes = express.Router();

let Users = require('../models/users.model');

//======
//Routes
//======

//Register Route
userRoutes.post('/register',(req,res) => {
	let email = req.body.email;
	let name = req.body.name;
	let password = req.body.password;

	//Valid Email Regex Tester (regex from emailregex.com)
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(email)){

		Users.countDocuments({email: email}, (err, count) => {
			if(err) throw err;
			if (count<=0) {

				let data = {
					email: email,
					name: name,
					password: password,
					token: '',
					userid: '_' + Math.random().toString(36).substr(2, 9)
				}

				Users.insertOne(data, (err, collection) => {
					if(err) throw err;
					console.log(`Added [${name}] to Users collection.`);

					res.render('login',{message:"Successfully created account! Please log in :D"});

				});
			}else{
				console.log('ERROR: Email already registered!');
				res.render('login',{error:"Email already registered! D;"});
			}

		});

	} else {
		console.log('ERROR: Email is invalid D:');
		res.render('login',{error:"Email is Invalid! D;"});
	}
});


//Login Route
userRoutes.post('/login',(req,res) => {
	let email = req.body.email;
	let password = req.body.password;

	Users.countDocuments({email: email, password: password}, (err, count) => {
		if(err) throw err;
		if(count >= 1){
			//Create randomly generated token string
			let newToken = Math.random().toString(36).substr(2)+"meow";

			Users.updateOne(
				{email: email,password: password},
				{$set: {token: newToken}},
				(err, doc) => {
					if(err) throw err;
					//Return to client the new token to store in url header and local storage
					//res.send(newToken);

					Users.findOne({email: email,password: password},(err, user)=>{
						console.log(user);
						res.render('loginSuccess',{
							newToken:newToken,
							userid:user.userid,
							name:user.name
						});
					})
					
			});
			
		} else {
			console.log('Error: Username or password incorrect or does not exist!');
			res.render('login',{error:'Username or password incorrect or does not exist! D:'})
		}
	})
});

//Logout Route
userRoutes.post('/logout',(req,res) => {
	let userid = req.body.userid;
	Users.updateOne(
		{userid: userid},
		{$set: {token: ''}},
		(err, doc) => {
			if(err) throw err;
			console.log(`[${userid}] has been logged off!`);
			res.render('login',{message:"Successfully logged off!"});
	});
});

//===================
//Debug Functions
//===================

//Logs out all users in Users collection
userRoutes.get('/userlist',(req,res) => {
	let formattedData = {};
	Users.find({},(err,data) => {
		if(err) throw err;
		
		data.forEach((doc) => { 
			formattedData[doc._id] = doc;
			console.log(doc);
		});
		res.send(formattedData);
	})
});

//Deletes user from email selected from Users collection
userRoutes.post('/deleteuser',(req,res) => {
	let formattedData = {};
	Users.deleteOne({email:req.body.email},(err,data) => {
		if(err) throw err;
		console.log(`Deleted [${req.body.email}] from Users!`);
	})
})

//====================
//Module/Router Export
//====================
module.exports = userRoutes;