'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	all_items: [{
		art: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Art'
		}, 
		quantity: Number
	}],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	order_type: {type: String, enum: ['gallery', 'order']},
	created_at: {
		type: Date,
		default: Date.now()
	},
	updated_at: {
		type: Date,
        default: Date.now()
	},
	total: Number, // do in frontend
	paid: Boolean,
	invoice_id: Number,
	promo_code: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'promo'
	}
});


schema.pre('update', function(next){
	this.updated_at = Date.now();
    next();
});

schema.pre('save', function(next){
	this.updated_at = Date.now();
	this.invoice_id = Date.now();
    next();
});



mongoose.model('Order', schema);
