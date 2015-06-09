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

mongoose.model('Category', schema);