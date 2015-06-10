var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Review = mongoose.model('Review');

router.get('/review/:id', function (req, res, next){
	Review.find({art_id: req.params.id})
	.exec()
	.then(function (reviews){
		res.send(reviews);
	})
	.then(null, next);
});

router.put('/review', function (req, res, next){

});

router.post('/review', function (req, res, next){
	Review.create(req.body)
	.exec()
	.then(function(){
		res.send({message: 'review was saved'});
	})
	.then(null, next);
});

router.delete('/review/:id', function (req, res, next){
	Review.remove({_id: req.params.id})
	.exec()
	.then(function(){
		res.send({message: 'review successfully removed'});
	})
	.then(null, next);
});
