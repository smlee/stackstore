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
		ref: 'Category'
		//required: true
	},
	artist_name: String,
	url: {
		type: String,
		set: setUrl,
		get: getUrl
	},
	price: {
		type: Number, 
		set: setPrice,
		get: getPrice
		
	},
	description: String,
	tags: [String]	
});


function getPrice () {
	return (this.price/100).toFixed(2);
};

function setPrice (num) {
	return num*100;
};

function setUrl (urlStr) {
	return urlStr;
};

function getUrl () {
	return this.url;
};

mongoose.model('Art', schema);