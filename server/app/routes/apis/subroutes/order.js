var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Order = mongoose.model('Order');

router.get('/', function (req, res, next){
	var _id = req.query._id
	Order.find({ user: _id })
	.populate("all_items.art")
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
	Order.findOneAndUpdate({_id: req.params._id})
	.exec()
	.then(function (updatedOrder) {
		res.send(updatedOrder)
	})
	.then(null, next);
});

//getting wierd error when trying to post
router.post('/', function (req, res, next){
	Order.create(req.body)
	.then(function(){
		res.send({message: 'order was saved'});
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next){

	Order.findOneAndUpdate({_id: req.params.id}, {$pull: {all_items: {art: req.query._id}}}).exec()
	.then(function (){
		res.send({message: 'Order successfully removed'});
	})
	.then(null, next);
});