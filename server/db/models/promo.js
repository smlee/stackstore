'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	type: { 
		type: String,
		enum: ['shipping', 'product']
	},
	discount: {
		discount_type: {
			type: String,
			enum: ['percent', 'flat']
		},
		amount: Number
	},
	art_id: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Art'
	}],
	category_id: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	}],
	creation_date: {
		type: Date,
		default: Date.now()
	},
	exp_date: {
		type: Date,
		default: Date.now() + 2592000000 
	}
});

mongoose.model('Promo', schema);