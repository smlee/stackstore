var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Category = mongoose.model('Category');

//would need to add contact onto req.body?
router.get('/:id', function (req, res, next){
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

router.put('/', function (req, res, next){

});
//tested 
router.post('/', function (req, res, next){
	Category.create(req.body)
	.then(function(){
		res.send({message: 'category was saved'})
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next){
	Category.remove({_id: req.params.id})
	.exec()
	.then(function () {
		res.send({message: 'category successfully removed'});
	})
	.then(null, next);
});