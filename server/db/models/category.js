'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	name: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	updated_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
});

schema.methods.getChildren = function() {
   return mongoose.model('Category').find({parent: this.id}).exec();
};
schema.methods.getSiblings = function() {
   	// mongoose.model('Category').findOne({_id: this.parent}, function(err, result){
       return this.constructor.find({parent: this.parent, _id: {$ne: this._id }}).exec();
   	//});
};

schema.pre('save', function(){
	this.updated_at = Date.now();
});

mongoose.model('Category', schema);