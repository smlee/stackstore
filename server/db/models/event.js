'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	name: {
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
		type: {
			String,
			minLength: 5,
			maxLength: 5
		},
		required: true
	},
	description: String,
	artist_id: {
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
		type: Date,
		default: Date.now
	},
	price: {
		type: Number, 
		get: getPrice,
		set: setPrice
	}
});


function getPrice () {
	return (this.price/100).toFixed(2);
}

function setPrice (num) {
	return num*100;
}	


mongoose.model('Event', schema);