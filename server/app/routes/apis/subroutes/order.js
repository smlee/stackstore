var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Order = mongoose.model('Order');

router.get('/order', function (req, res, next){
	Order.find({})
	.exec()
	.then(function (orders){
		res.send(orders);
	})
	.then(null, next);
});

router.get('/order/:id', function (req, res, next){
	Order.findOne({_id: req.params.id})
	.exec()
	.then(function (order){
		res.send(order);
	})
	.then(null, next);
});

router.put('/order', function (req, res, next){

});

router.post('/order', function (req, res, next){
	Order.create(req.body)
	.exec()
	.then(function(){
		res.send({message: 'order was saved'});
	})
	.then(null, next);
});