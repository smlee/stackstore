'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var user = mongoose.model('User');
var art = mongoose.model('Art');
var contact = mongoose.model('Contact');
var review = mongoose.model('Review');
var order = mongoose.model('Order');
var the_event = mongoose.model('Event');
var category = mongoose.model('Category');

router.get('*', function(){
	console.log("got here");
});

router.get('user', function(req, res){
	user.find({
		role: req.query.role
	}, function(err, result){
		if(err) res.send({message: 'no artist found'}).status(404);
		res.send(result);
	});	
});

router.get('user/:id', function(req, res){
	user.findOne({
		_id: req.params.id,
		role: req.query.role
	}, function(err, result){
		if(err) res.send({message: 'no such artist found'}).status(404);
		res.send(result);
	});				
});

router.put('user/:id', function(req, res){
	user.findOne({_id: req.params.id}, function(err, result){
		if(err) res.status(401);
		// var propsArr = Object.getOwnPropertyNames(req.body);
		// if(propsArr.length > 0){
		// 	if(req.body.user){
		// 		result.email = req.body.email;
		// 		result.
		// 	}
		// }
	}).populate({
		path: 'Contact',
		match: {type: req.body.contact.type}
	}).exec(function(err, contactArr){
		if(err) res.send({message: 'contacts didn\'t save properly'}).status(404);
		if(req.body.contact){
			contactArr[0] = req.body.contact;
			contactArr[0].save(function(err){
				if(err) res.send({message: 'didn\'t save'});
				res.send({message: 'saved'});
			})
		}
	});
});

router.post('user', function(req, res){
	contact.create({
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		phone_number: req.body.phonenum,
		address_line_1: req.body.address_line_1,
		address_line_2: req.body.address_line_2,
		city: req.body.city,
		state: req.body.state,
		zip: req.body.zip,
		type: req.body.type
	}, function(err, contact){
		if(err) res.status(401);
		user.findOneAndUpdate({
			_id: req.body.id
		},{contact: contact._id}, function(err){
			if(err) res.status(401);
			else res.send({message: 'contact info saved'})
		});
	});	
});


router.get('art', function(req, res){
	if(req.query){
		art.find(req.query, function(err, theArt){
			if(err) res.status(404);
			res.send(theArt);
		});
	}
});

router.get('art/:id', function(req, res){
	art.findOne({_id: req.body.id}, function(err, theArt){
		if(err) res.status(404);
		res.send(theArt);
	});
});

router.put('art', function(req, res){

});

router.post('art', function(req, res){
	art.create(req.body, function(err){
		if(err) res.status(404);
		res.send({message: 'art was saved'});
	});
});

router.delete('art/:id', function(req, res){
	art.remove({_id: req.params.id}, function(err){
		if(err) res.status(404);
		res.send({message: 'art successfully removed'});
	});
});



router.get('review/:id', function(req, res){
	review.find({art_id: req.params.id}, function(err, reviews){
		if(err) res.status(404);
		res.send(reviews);
	});
});

router.put('review', function(req, res){

});

router.post('review', function(req, res){
	review.create(req.body, function(err){
		if(err) res.status(404);
		res.send({message: 'review was saved'});
	});
});

router.delete('review/:id', function(req, res){
	review.remove({_id: req.params.id}, function(err){
		if(err) res.status(404);
		res.send({message: 'review successfully removed'});
	});
});



router.get('order', function(req, res){
	order.find({}, function(err, orders){
		if(err) res.status(404);
		res.send(orders);
	})
});

router.get('order/:id', function(req, res){
	order.findOne({_id: req.params.id}, function(err, theOrder){
		if(err) res.status(404);
		res.send(theOrder);
	});
});

router.put('order', function(req, res){

});

router.post('order', function(req, res){
	order.create(req.body, function(err){
		if(err) res.status(404);
		res.send({message: 'order was saved'});
	});
});





router.get('event', function(req, res){
	the_event.find({}, function(err, result){
		if(err) res.send({message: 'no events found'}).status(404);
		res.send(result);
	});
});

router.get('event/:id', function(req, res){
	the_event.findOne({_id: req.params.id}, function(err, result){
		if(err) res.send({message: 'event not found'}).status(404);
		res.send(result);
	});
});

router.post('event', function(req, res){
	console.log("made it");
	
	the_event.create(req.body, function(err){
		if(err) res.send(err);//res.status(404);
		res.send({message: 'event was saved'});
	});
});

router.delete('event/:id', function(req, res){
	the_event.remove({_id: req.params.id}, function(err){
		if(err) res.status(404);
		res.send({message: 'event successfully removed'});
	});
});






router.get('category/:id', function(req, res){
	category.findOne({_id: req.params.id}, function(err){
		if(err) res.status(404);
	})
	.populate({
		path: 'parent',
		match: {type: req.body.contact.type}
	}).exec(function(err, contactChildArr){
		if(err) res.status(404);
		res.send(contactChildArr[0]);
	});
});

router.put('category', function(req, res){

});

router.post('category', function(req, res){
	category.create(req.body, function(err){
		if(err) res.status(404);
		res.send({message: 'category was saved'})
	});
});

router.delete('category', function(req, res){
	category.remove({_id: req.params.id}, function(err){
		if(err) res.status(404);
		res.send({message: 'category successfully removed'});
	});
});