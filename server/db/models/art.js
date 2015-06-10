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
	url:String,
	price:String,
	description: String,
	tags:{
		type: [],
		set: setTags,
		get: getTags
	}
});
function setTags(arrArg){
	return arrArg;
}

function getTags(arrArg){
	return arrArg.join(',');
}

mongoose.model('Art', schema);