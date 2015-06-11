var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Order = mongoose.model('Order');

router.get('/', function (req, res, next){
	Order.find({})
	.exec()
	.then(function (orders){
		res.send(orders);
	})
	.then(null, next);
});

router.get('/:id', function (req, res, next){
	Order.findOne({_id: req.params.id})
	.exec()
	.then(function (order){
		res.send(order);
	})
	.then(null, next);
});

router.put('/', function (req, res, next){

});

//getting wierd error when trying to post
router.post('/', function (req, res, next){
	Order.create(req.body)
	.then(function(){
		res.send({message: 'order was saved'});
	})
	.then(null, next);
});