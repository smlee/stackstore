'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	all_items: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Art'
	},
	user: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'User'
	},
	type: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	total: {type: Number},
	paid: Boolean,
	invoice_id: Number
});

mongoose.model('Order', schema);
