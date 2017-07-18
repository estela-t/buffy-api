const mongoose = require('mongoose');
// capital letters indicate constructors
// means that we will need to use the New keyword to create something
const Schema = mongoose.Schema;

// each bit of data and collection needs to have a separate schema
// now, if anyone wants to put a new character in the system, they can ONLY put these 4 keys in, can't add a "color" one, for example
// creates a structure for the API data
// if you explore mongoose more, it has a bunch of validations to prevent people from putting in garbage data. 
const characterSchema = new Schema({
	name: String,
	fullname: String,
	// species: Object,
	// status: Object,
	birthdate: Number,
	// aliases: String,
	// superpowers: Object,
	// relatives: Object,
});

// this tells mongoose that this schema represents 'Character' in the character collection
// if this collection doesnt exist, it will create it for us
// will use the petSchema to create a blueprint for the data
module.exports = mongoose.model('Character', characterSchema);


// name
// 	nickname: spike
// 	full name
// species
// 	human
// 	vampire
// 	other
// status
// 	undead
// 	alive
// 	dead
// age
// aliases
// 	1
// 	2
// relatives
// 	mother
// 	father
// Superpowers
// 	flying
// 	super-strength
// 	combat
// 	hypnosis
// 	witchery
// 	nerdery
// Quotes
// 	1
// 	2
// 	3

