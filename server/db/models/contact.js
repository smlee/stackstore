'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	contact_type: {type: String, enum: ['shipping', 'billing', 'home', 'event']},
	label: String,	
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
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: Number,
		min: 00501,
		max: 99950,
		required: true
	}
});

mongoose.model('Contact', schema);