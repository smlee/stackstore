var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Art = mongoose.model('Art');
var Category = mongoose.model('Category');

//tested without query string gets all
//tested with query gets specific
router.get('/', function (req, res, next){
	var category = req.query.category ? {category: req.query.category} : {}
	//console.log('this is category in the backend', category)
	// if(req.query){
		Art.find(category)
		.populate("category")
		.exec()
		.then(function (art) {
			res.send(art);
		})
		.then(null, next);
	// }
});
//tested
router.get('/:id', function (req, res, next){
	//console.log('this is req.params.id', req.params.id)
	Art.findOne({_id: req.params.id})
	.exec()
	.then(function (art){
		res.send(art);
	})
	.then(null, next);
});

//tested
router.put('/', function(req, res, next){
	var categoryBody = req.body.category
	req.body.category = req.body.category._id
	Art.findOneAndUpdate({_id: req.body._id}, req.body)
	.exec()
	.then(function(){
		Category.findOneAndUpdate({_id: req.body.category}, categoryBody)
		.exec()
		.then(null, next);
	})
	.then(function() {
		res.send("Updated")
	})
	.then(null, next);
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
