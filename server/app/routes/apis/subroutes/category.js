var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Category = mongoose.model('Category');

router.get('/', function(req, res, next){
	Category.find({}, function(err, category){
		res.send(category);
	});
});

router.get('/:id', function (req, res, next){
    Category.findOne({_id: req.params.id})
    .populate('parent')
    .exec()
    .then(function (contactChild){
        res.send(contactChild);
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

//will post sub-category when someone adds it to a form
// router.post('/:parentId', function(){
// 	var subCategory = new Category({
// 		parent: req.params.parentId,
// 		name: req.body.subcategoryName
// 	});
// 	subCategory.save(function(err, data){
// 		res.send('success!')
// 	});
// });

router.delete('/:id', function (req, res, next){
	Category.remove({_id: req.params.id})
	.exec()
	.then(function () {
		res.send({message: 'category successfully removed'});
	})
	.then(null, next);
});