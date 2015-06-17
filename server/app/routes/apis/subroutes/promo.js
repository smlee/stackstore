var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Promo = mongoose.model('Promo');


router.get('/', function (req, res, next){
	Promo.find({})
	.exec()
	.then(function (allPromos) {
		res.send(allPromos);
	})
	.then(null, next);
});
//art id
router.get('/:code', function (req, res, next){
	Promo.findOne({code: req.params.code})
	.exec()
	.then(function (promo) {
		if (promo){
			res.send(promo)
		} else res.send(false)
	})
	.then(null, next);
});

router.put('/', function(req, res, next){
	Promo.findOneAndUpdate({_id: req.body._id}, req.body)
	.exec()
	.then(function(promo){
		res.send("Promo Updated")
	})
	.then(null, next);
});

router.post('/', function (req, res, next){
	console.log(req.body);
	
	Promo.create(req.body)
	.then(function (){
		res.send({message: 'promo was saved'});
	})
	.then(null, next);
});

//art id
router.delete('/:id', function (req, res, next){
	Promo.remove({_id: req.params.id})
	.exec()
	.then(function (){
		res.send({message: 'promo successfully removed'});
	})
	.then(null, next);
});
