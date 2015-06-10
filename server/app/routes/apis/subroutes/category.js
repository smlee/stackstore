var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Category = mongoose.model('Category');

router.get('/category/:id', function (req, res, next){
	Category.findOne({_id: req.params.id})
	.populate({
		path: 'parent',
		match: {type: req.body.contact.type}
	})
	.exec()
	.then(function (contactChildArr){
		res.send(contactChildArr[0]);
	})
	.then(null, next)
});

router.put('/category', function (req, res, next){

});

router.post('/category', function (req, res, next){
	Category.create(req.body)
	.exec()
	.then(function(){
		res.send({message: 'category was saved'})
	})
	.then(null, next);
});

router.delete('/category', function (req, res, next){
	Category.remove({_id: req.params.id})
	.exec()
	.then(function () {
		res.send({message: 'category successfully removed'});
	})
	.then(null, next);
});