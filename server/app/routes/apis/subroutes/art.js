var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Art = mongoose.model('Art');

//tested without query string gets all
//tested with query gets specific
router.get('/', function (req, res, next){
	var category = req.query.category ? {category: req.query.category} : {}
	console.log('this is category in the backend', category)
	// if(req.query){
		Art.find(category)
		.exec()
		.then(function (art) {
			res.send(art);
		})
		.then(null, next);
	// }
});
//tested
router.get('/:id', function (req, res, next){
	console.log('this is req.params.id', req.params.id)
	Art.findOne({_id: req.params.id})
	.exec()
	.then(function (art){
		res.send(art);
	})
	.then(null, next);
});

router.put('/', function(req, res, next){

});
//tested
router.post('/', function (req, res, next){
	Art.create(req.body)
	.then(function (err){
		res.send({message: 'art was saved'});
	})
	.then(null, next);
});
//tested
router.delete('/:id', function (req, res, next){
	Art.remove({_id: req.params.id})
		.exec()
		.then(function (err){
			res.send({message: 'art successfully removed'});
		})
		.then(null, next);
});
