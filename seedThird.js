var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var q = require('q');
var chalk = require('chalk');

var getCurrentReviewsData = function(){
	return q.ninvoke(Review,'find', {});
};
var getCurrentOrdersData = function(){
	console.log('getCurrentOrdersData')
	return q.ninvoke(Order, 'find', {});
};

var seedOrders = function(){
	console.log('step four')
	var orders = [
		{	
			all_items: [{art:'5579ab85fcf5a1561e5157b1', quantity: 1}, {art:'5579ab85fcf5a1561e5157b5', quantity: 3}],
			user:'5579a6577b93c0151efc21af',
			order_type: 'order',
			paid: false,
			invoice_id: Date.now()
		},
		{
			all_items: [{art: '5579ab85fcf5a1561e5157af', quantity: 1}, {art: '5579ab85fcf5a1561e5157ae', quantity: 1}],
			user: '5579a6577b93c0151efc21b0',
			order_type: 'order',
			paid: true,
			invoice_id: Date.now()+1
		},
		{
			all_items: [{art:'5579ab85fcf5a1561e5157b3', quantity: 1}, {art:'5579ab85fcf5a1561e5157b5', quantity: 3}],
			user: '5579a6577b93c0151efc21ad',
			order_type: 'gallery',
			paid: false,
			invoice_id: Date.now()+2
		}
	];
	console.log('before the return')
	return q.invoke(Order, 'create', orders);
};

var seedReviews = function(){

	var reviews = [
		{
			content: 'AMAZING ART FOR THE WIN!',
			rating: 4,
			art_id: '5579ab85fcf5a1561e5157b3',
			user_id: '5579a6577b93c0151efc21b2'
		},
		{
			content: 'SUPER AMAZING! LOOKS GREAT IN MY ROOM',
			rating: 5,
			art_id: '5579ab85fcf5a1561e5157af',
			user_id: '5579a6577b93c0151efc21b4'
		},
		{
			content: 'Eh, it\'s ok',
			rating: 3,
			art_id: '5579ab85fcf5a1561e5157b1',
			user_id: '5579a6577b93c0151efc21b3'
		},
		{
			content: 'Such an amazing piece and worth every penny',
			rating: 5,
			art_id: '5579ab85fcf5a1561e5157b5',
			user_id: '5579a6577b93c0151efc21b3'
		}
	];
	return q.invoke(Review, 'create', reviews);
};

connectToDb.then(function () {
	console.log('first step!');
    getCurrentOrdersData().then(function (order) {
    	console.log('inside step two')
        if (order.length === 0) {
        	console.log('inside step three')
            return seedOrders();
        } else {
            console.log(chalk.magenta('Seems to already be order data, exiting!'));
            return;
        }
    }).then(function () {
    	console.log('inside the second then')
    	getCurrentReviewsData().then(function (review){
    		if(review.length === 0){
    			return seedReviews();
    		} else {
    			console.log(chalk.magenta('Seems to already be review data, exiting!'));
    			process.kill(0);
    		}
    	}).then(function(){
        	console.log(chalk.green('Seed successful!'));
        	process.kill(0);
    	}).catch(function (err) {
        	console.error(err);
        	process.kill(1);
    	});
    });
});
