var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Review = mongoose.model('Review');

//tested remember to use art id in params
router.get('/:id', function (req, res, next){
	Review.find({art_id: req.params.id})
    .populate('user_id')
	.exec()
	.then(function (reviews){
            console.log(reviews);
		res.send(reviews);
	})
	.then(null, next);
});

router.put('/', function (req, res, next){

});
//tested but i think art id should be required in the models
router.post('/', function (req, res, next){
	Review.create(req.body)
	.then(function(){
		res.send({message: 'review was saved'});
	})
	.then(null, next);
});

//tested remember to use review id in params
router.delete('/:id', function (req, res, next){
	Review.remove({_id: req.params.id})
	.exec()
	.then(function(){
		res.send({message: 'review successfully removed'});
	})
	.then(null, next);
});
