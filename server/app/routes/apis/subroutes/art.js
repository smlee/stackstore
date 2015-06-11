var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Art = mongoose.model('Art');

//tested without query string gets all
//tested with query gets specific
router.get('/', function (req, res, next){
	// if(req.query){
		Art.find(req.query)
		.exec()
		.then(function (art) {
			res.send(art);
		})
		.then(null, next);
	// }
});
//tested
router.get('/:id', function (req, res, next){
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
