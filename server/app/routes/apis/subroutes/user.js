var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var User = mongoose.model('User');
var Contact = mongoose.model('Contact');

router.get('/', function (req, res, next){
	console.log(req.query.role);
	//User.find({role: req.query.role})
	User.find({})
	.populate("contact")
	.exec()
	.then(function (users){

		res.send(users);
	})
	.then(null, next);		
});

router.get('/:id', function (req, res, next){
	User.findOne({
		_id: req.params.id,
		role: req.query.role
	})
	.exec()
	.then(function (user){

		//User.findOne({_id: req.query.contactId})
		//.exec()


		res.send(user);
	})
	.then(null, next);				
});

router.put('/:id', function (req, res, next){
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
			});
		}
	})
	.then(null, next);
});

router.post('/', function (req, res, next){
	//2 problems 
	//1. right now in order to create a user all the things required in the contacts model must also be on the req.body
	//2. also the user info is in the req.body but is being used by contact instead of user
	
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
	.then(function (contact){
		User.findOneAndUpdate({_id: req.body.id}, {contact: contact._id})
		.exec()
		.then(function(){
			res.send({message: 'contact info saved'});
		})
		.then(null, next);	
	})
	.then(null, next);	
});