var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookInstanceSchema = new Schema({
	book: {type: Schema.ObjectId, ref: 'Book', required: true },
	//this makes book a reference to single Book model object
	imprint: {type: String, required: true},
	status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'], default: 'Maintenance'},
	//enum lets us set the allowed values of a string, preventing mispellings and arbitrary values. we've also added a default value
	due_back: {type: Date, default: Date.now}
	//this makes the default due_back date now. I assume we'll change this later to be a set time, like a month from now or something.
})

BookInstanceSchema
.virtual('url')
.get(function(){
	return '/catalog/bookinstance/' + this._id;
})

BookInstanceSchema
.virtual('due_back_formatted')
.get(function(){
	return moment(this.due_back).format('MMMM Do, YYYY')
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);