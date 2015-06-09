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
	db_url: String,
	db_price: Number,
	description: String,
	tags: [String]	
});

schema.virtual('price').set(function(num) {
	this.db_price = num*100;
});

schema.virtual('price').get(function() {
    return (this.db_price/100).toFixed(2);
});

schema.virtual('url').set(function(urlStr) {
	this.db_url = urlStr;
});

schema.virtual('url').get(function() {
    return this.db_url;
});

mongoose.model('Art', schema);