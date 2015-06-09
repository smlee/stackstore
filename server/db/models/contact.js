'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	phone_number: {
		type: String,
		required: true
	},
	address_line_1: {
		type: String,
		required: true
	},
	address_line_2: String,
	type: String,
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		minLength: 5,
		maxLength: 5,
		required: true
	}
});

mongoose.model('Contact', schema);