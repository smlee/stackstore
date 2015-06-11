'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	event_name: {
		type: String,
		required: true
	},
	contact_info: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'},
	// address_line_1: {
	// 	type: String,
	// 	required: true
	// },
	// address_line_2: String,
	// city: {
	// 	type: String,
	// 	required: true
	// },
	// state: {
	// 	type: String,
	// 	required: true
	// },
	// zip: {
	// 	type: String,
	// 	minLength: 5,
	// 	maxLength: 5,
	// 	required: true
	// },
	description: String,
	user_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    },
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	event_date: {
		type: Date
	},
	price: Number
});

schema.pre('save', function(next){
	this.updated_at = Date.now();
    next();
});

schema.pre('update', function(next){
	this.updated_at = Date.now();
    next();
});

mongoose.model('Event', schema);