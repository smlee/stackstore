var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var User = mongoose.model('User');
var Contact = mongoose.model('Contact');

router.get('/user', function (req, res, next){
	User.find({role: req.query.role})
	.exec()
	.then(function (users){
		res.send(users);
	})
	.then(null, next);		
});

router.get('/user/:id', function (req, res, next){
	User.findOne({
		_id: req.params.id,
		role: req.query.role
	})
	.exec()
	.then(function (user){
		res.send(user);
	})
	.then(null, next);				
});

router.put('/user/:id', function (req, res, next){
	User.findOne({_id: req.params.id})
	.populate({
		path: 'Contact',
		match: {type: req.body.contact.type}
	})
	.exec()
	.then(function (contactArr){
		if(req.body.contact){
			contactArr[0] = req.body.contact;
			contactArr[0].save(function(){
				res.send({message: 'saved'});
			})
		}
	})
	.then(null, next);
});

router.post('/user', function (req, res, next){
	Contact.create(req.body
	// {
	// 	first_name: req.body.firstname,
	// 	last_name: req.body.lastname,
	// 	phone_number: req.body.phonenum,
	// 	address_line_1: req.body.address_line_1,
	// 	address_line_2: req.body.address_line_2,
	// 	city: req.body.city,
	// 	state: req.body.state,
	// 	zip: req.body.zip,
	// 	type: req.body.type
	// }
	)
	.exec()
	.then(function (contact){
		User.findOneAndUpdate({_id: req.body.id}, {contact: contact._id})
		.exec()
		.then(function(){
			res.send({message: 'contact info saved'})
		})
		.then(null, next);	
	})
	.then(null, next);	
});