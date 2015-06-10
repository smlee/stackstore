var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Art = mongoose.model('Art');

router.get('/art', function (req, res, next){
	if(req.query){
		Art.find(req.query)
		.exec()
		.then(function (art) {
			res.send(art);
		})
		.then(null, next);
	}
});

router.get('/art/:id', function (req, res, next){
	Art.findOne({_id: req.body.id})
	.exec()
	.then(function (art){
		res.send(art);
	})
	.then(null, next);
});

router.put('/art', function(req, res, next){

});

router.post('/art', function (req, res, next){
	Art.create(req.body)
	.exec()
	.then(function (err){
		res.send({message: 'art was saved'});
	})
	.then(null, next);
});

router.delete('/art/:id', function (req, res, next){
	Art.remove({_id: req.params.id})
		.exec()
		.then(function (err){
			res.send({message: 'art successfully removed'});
		})
		.then(null, next);
});
