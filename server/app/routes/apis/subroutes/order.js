var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Order = mongoose.model('Order');

router.get('/', function (req, res, next){
	console.log('does query exist?',req.query);
	console.log('does req body exist?', req.body.params)
	var id = req.query._id;
	Order.find({ user: id })
	.populate("all_items.art")
	.exec()
	.then(function (orders){
		console.log('what is orders??', orders);
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

router.put('/push', function(req, res, next){
	console.log('inside the push route', req.body.params);
	var itemFix = req.body.params.newData.all_items.map(function(elem) {
		return {art: elem.art._id, quantity: elem.quantity}
	});
	console.log('this is what itemfix looks like', itemFix)
	Order.findOne({_id: req.body.params._id}, function(err, order){
		if(err) return next(err);
		order.all_items.push(itemFix[0]);
		order.save(function(err, data){
			if(err) return next(err);
			console.log('orders successfully pushed', data);
			res.send(data)
		});
	});
});

router.put('/update', function(req, res, next){
	var itemFix = req.body.params.newData.all_items.map(function(elem) {
		console.log('elem elem', elem)
		return {art: elem.art._id, quantity: elem.quantity}
	})
		//re-assign all_items with the fixed array
		req.body.params.newData.all_items = itemFix;
	Order.update({_id: req.body.params._id}, req.body.params.newData)
	.exec()
	.then(function (updatedOrder) {
		console.log('order successfully updated')
		res.send(updatedOrder)
	})
	.then(null, next);
});

router.put('/update/:id', function(req, res, next){
    Order.findOneAndUpdate({_id: req.params.id, 'all_items._id': req.body.params._id},
        { $set: {'all_items.$.quantity': req.body.params.quantity}}, function (err, result) {
            if (err) return next(err);
            console.log('Is this updated?',result);
            res.send({message: 'Quantity updated.'});
        })
});

router.put('/', function (req, res, next){
	Order.findOneAndUpdate({_id: req.params._id})
	.exec()
	.then(function (updatedOrder) {
		res.send(updatedOrder)
	})
	.then(null, next);
});

router.post('/', function (req, res, next){

	var itemFix = req.body.params.all_items.map(function(elem) {
		return {art: elem.art._id, quantity: elem.quantity}
	})
	//re-assign all_items with the fixed array
	req.body.params.all_items = itemFix;
	
	Order.create(req.body.params, function(err, order){
		if(err) return next(err);
		res.send({message: 'Save successful!'});
	})
});

router.delete('/:id', function (req, res, next){

	Order.findOneAndUpdate({_id: req.params.id}, {$pull: {all_items: {art: req.query._id}}}).exec()
	.then(function (){
		res.send({message: 'Order successfully removed'});
	})
	.then(null, next);
});