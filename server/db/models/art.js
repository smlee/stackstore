'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'//,
		//required: true
	},
	artist_name: String,
	url: String,
	price: Number,
	description: String,
	quantity: Number,
	tags: [String]
});


mongoose.model('Art', schema);