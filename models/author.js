var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//creates author model with field names and their types
var AuthorSchema = new Schema({
	first_name: {type: String, required: true, max: 100},
	family_name: {type: String, required: true, max: 100},
	date_of_birth: {type: Date},
	date_of_death: {type: Date}
})

//makes it so that when 'name' is called on an object created with the AuthorSchema, it will return with Family_name,First_name
AuthorSchema
 .virtual('name')
 .get(function (){
 	return this.family_name + ', ' + this.first_name;
 });

//makes it so 'url' called on AuthorSchema-made object returns a url that includes the id retrieved from the database 

 AuthorSchema
 .virtual('url')
 .get(function(){
 	return '/catalog/author/' + this._id;
 })

//exports the model so it can be used in other files 
 module.exports = mongoose.model('Author', AuthorSchema);