var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Event = mongoose.model('Event');

//tested 
router.get('/', function (req, res, next){
	Event.find({})
	.exec()
	.then(function (events){
		console.log('here be events', events)
		res.send(events);
	})
	.then(null, next);
});
//tested
router.get('/:id', function (req, res, next){
	Event.findOne({_id: req.params.id})
	.exec()
	.then(function (event){
		res.send(event);
	})
	.then(null, next);
});
//tested   
router.post('/', function (req, res, next){	
	Event.create(req.body)
	.then(function(){
		console.log("got here");
		res.send({message: 'event was saved'});
	})
	.then(null, next);
});

//tested
router.put('/', function (req, res, next){
	Event.findOneAndUpdate({_id: req.body._id}, req.body)
	.exec()
	.then(function() {
		res.send("Updated")
	})
	.then(null, next);
});

//tested
router.delete('/:id', function (req, res, next){
	Event.remove({_id: req.params.id})
	.exec()
	.then(function(){
		res.send({message: 'event successfully removed'});
	})
	.then(null, next);
});
