const express = require('express');
const postRoutes = express.Router();

let Posts = require('../models/posts.model');
let Users = require('../models/users.model');


//======
//Routes
//======

//Create Post
postRoutes.post('/create',(req,res) => {
	let token = req.body.token;
	let content = req.body.content;
	let title = req.body.title;

	//Check if token is a vlaid user
	Users.findOne({token:token},(err,user) => {
		if(err) throw err;

		if(user){
			//Get userid for the authorid
			let authorid = user.userid;
			let authorname = user.userid;
			let postid = Math.random().toString(36).substr(2);

			let data = {
				postid: postid,
				createdOn: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
				content: content,
				title: title,
				authorid: authorid,
				authorname: authorname
			}

			//Adds Post to the Posts Collection
			Posts.insertOne(data, (err, data) => {
				if(err) throw err;

				console.log(`Added [${postid}] to Posts collection.`);
				res.send(`Added [${postid}] to Posts collection.`);

			});
			
		}else{
			console.log('Invalid Token/User!',token,user);
			res.send('Invalid Token/User!',token,user);
		}
			
	})

})

//Update Post
postRoutes.post('/update',(req,res) => {
	let token = req.body.token;
	let postid = req.body.postid;
	let content = req.body.content;
	let title = req.body.title;

	//Check if token is a vlaid user
	Users.findOne({token:token},(err,user) => {
		if(err) throw err;

		if(user){
			//Get userid for the authorid
			let authorid = user.userid;

			Posts.updateOnce(
				{authorid:authorid, postid:postid},
				{$set: {content: content, title: title}})
				.then((post) => {
					let { matchedCount, modifiedCount } = post;

					if(matchedCount<=0){ //Found no matches
						console.log(`Could not find post with the given authorid/or invalid authorid [${postid}/${authorid}]`);
						res.send(`Could not find post with the given authorid/or invalid authorid [${postid}/${authorid}]`)

					} else if (matchedCount && modifiedCount){ //Found Match and Updated
						console.log(`Updated [${postid}] to Posts collection.`);
						res.send(`Updated [${postid}] to Posts collection.`)

					}
				})
				.catch(err => console.error(err));
			
		}else{
			console.log('Invalid Token/User!',token,user);
			res.send('Invalid Token/User!',token,user);
		}
			
	})
})

//Delete Post
postRoutes.post('/delete',(req,res) => {
	let token = req.body.token;
	let postid = req.body.postid;

	//Check if token is a vlaid user
	Users.findOne({token:token},(err,user) => {
		if(err) throw err;

		if(user){
			//Get userid for the authorid
			let authorid = user.userid;

			Posts.deleteOne({authorid:authorid, postid:postid},(err,post) => {
				if(err) throw err;
				console.log(`Deleted [${postid}] post from Posts!`);
				res.send(`Deleted [${postid}] post from Posts!`);
			})
			
		}else{
			console.log('Invalid Token/User!',token,user);
			res.send('Invalid Token/User!',token,user);
		}
			
	})
})

//DEBUG 
postRoutes.get('/list',(req,res) => {
	let formattedData = {};
	Posts.find({},(err,data) => {
		if(err) throw err;
		
		data.forEach((doc) => { 
			formattedData[doc._id] = doc;
			console.log(doc);
		});
		res.send(formattedData);
	})
});

postRoutes.post('/forcedelete',(req,res) => {
	let postid = req.body.postid;

	Posts.deleteOne({postid:postid},(err,post) => {
		if(err) throw err;
		console.log(`Deleted [${postid}] post from Posts!`);
	})
})

//Get Post All
postRoutes.get('/all',(req,res)=>{

	Posts.find({}).toArray().then(data=>{

		/*_id: 5df4fe2a2f5ba54ae02fa55e,
	    postid: 'l2kyyhrob4',
	    createdOn: '2019/12/14',
	    content: 'Cats are very floof creatures.',
	    title: 'Cats are cool!',
	    authorid: '_kn2aq29ag'*/

	    res.render('allposts',{posts:data});
	})
	/*Posts.find({},(err,data) => {
		if(err) throw err;
		
		let formattedData = [];

		data.forEach((doc) => { 
			formattedData.push(doc);
			console.log(doc);
		});
		console.log(data.toArray());

		data.toArray().then((rd)=>{
			console.log(rd);
		})
		res.send(formattedData);
	})*/
});

//Get Post
postRoutes.get('/:id',(req,res)=>{
	let postid = req.params.id;

	Posts.findOne({postid:postid},(err,post) => {
		if(err) throw err;
		if(post){
			res.send(post);
		}else{
			console.log('Invalid Post ID',postid);
			res.send('Invalid Post ID',postid);
		}
		
	});
});

//====================
//Module/Router Export
//====================
module.exports = postRoutes;