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
	status: {
		type: String,
		enum: ['created', 'processing', 'cancelled', 'completed']
	},
	promo_code: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Promo'
	}
},{
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

schema.virtual('subtotal').get(function(){
    var subtotal = 0;
    this.all_items.forEach(function(elem){
        subtotal += (elem.quantity * elem.art.price);
    });
    console.log("I REALLY HOPE THIS IS RUNNING",subtotal);
    return subtotal;
});

schema.virtual('totalquant').get(function(){
    var tq = 0;
    this.all_items.forEach(function(elem){
        tq += elem.quantity;
    });
    return tq;
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
