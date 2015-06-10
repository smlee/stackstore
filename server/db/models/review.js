'use strict';
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	content: String,
	rating: { 
		type: Number, 
		min: 1,
		max: 5
	},
	art_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Art'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Review', schema);