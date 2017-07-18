const express = require('express');
const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const Character = require('./models/character.js');
const DBURL = process.env.MONGODB_URI || 'mongodb://localhost/buffyverse'

mongoose.connect(DBURL);

// bodyparser is another type of middleware for dealing with requests before they get to the person making the request
const bodyParser = require('body-parser');

// i am using the public directory as the location for static files
// .use runs middleware defined above, e.d. bodyparser
app.use(express.static('public'));
app.use(bodyParser.json());

router.route('/')
	.get((req, res) => {
		res.send({
			affirmation: "I may be dead, but I’m still pretty. - Buffy 🔥",
			information: "Go to these endpoints to get the info you need:",
			characters: "/api/characters"
		});
	});

// setting up the character endpoint
router.route('/characters')
	.get((req,res) => {
		console.log('testing get request for char endpoint');
		//get all the characters
		const character = Character.find();
		const query = req.query;

		// display the characters alphabetically by their names (name: 1), then their fullnames during GET request (fullname: 1). -1 sorts them reverse alphabetically.
		if(query.order_by = 'name') {
			character.sort({
				name: 1,
				fullname: 1
			});
		}

		character.exec({}, (err, docs) => {
			//error handling
			if (err !== null) {
				res
					.status(400)
					.send({
						error: err
					});
				return;
			}
			res
				.status(200)
				.send(docs);
		});
	})
	.post((req, res) => {
		const body = req.body;
		const character = new Character(body);
		// saves this to the db, like insert(). save() is part of the mongoose API
		character.save((err, doc) => {
			//error handling
			if (err !== null) {
				res.status(400)
					 .send({
						error: err
					 });
				return;
			}
			//success handling
			res
				.status(200)
			// consider sending back more info about what should be shown to the user as a response. see the JSON recommendations
				.send(doc);
		});
		console.log(body);
		// if we don't call .end or .send(), the request will never end and it will crash the server. .send() is called above, so no need for "res.end()"
	})

// doing actions on particular characters
router.route('/characters/:character_id')
	.get((req, res) => {
		Character.findById(req.params.character_id, (err, character) => {
			//error handling
			if (err) {
				res
					.status(400)
					.send(err);
				return;
			}
			//success handling
			res
				.status(200)
				.send(character);
		});
	})
	// .put((req, res) => {
	// 	Character.findById(req.params.character_id, (err, character) => {
	// 		// error handling
	// 		if (err) {
	// 			res
	// 				.status(400)
	// 				.send(err);
	// 			return;
	// 		}
	// 		character.save((err, savedCharacter) => {
	// 			if (err !== null) {
	// 				res.status(400)
	// 					 .send({
	// 					 		error: err
	// 					 });
	// 				return;
	// 			}
	// 			res
	// 				.status(200)
	// 				.send(character);
	// 		});
	// 	});
	// })
	.delete((req, res) => {
		Character.findByIdAndRemove(req.params.character_id, (err, character) => {
			//error handling
			if (err) {
				res
					.status(400)
					.send(err)
				return;
			}
			//success handling
			res
				.status(200)
				.send({
					message: "Successfully deleted"
				});
		});
	});

app.use('/api', router);

app.listen(port);