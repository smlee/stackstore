'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	type: String,
	art_id: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Art'
	}],
	exp_date: Date,
	
});

mongoose.model('Promo', schema);


// all_items: [{
// 		art: {
// 			type: mongoose.Schema.Types.ObjectId,
// 			ref: 'Art'
// 		}, 
// 		quantity: Number
// 	}],
// 	user: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: 'User'
// 	},
// 	order_type: {type: String, enum: ['gallery', 'order']},
// 	created_at: {
// 		type: Date,
// 		default: Date.now()
// 	},
// 	updated_at: {
// 		type: Date,
//         default: Date.now()
// 	},
// 	total: Number, // do in frontend
// 	paid: Boolean,
// 	invoice_id: Number