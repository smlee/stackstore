var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var User = mongoose.model('User');
var Contact = mongoose.model('Contact');

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('_gAIqkrAdNo6SSMbP2mDFQ');

function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false   
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
 };



router.get('/', function (req, res, next){
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

router.put('/email', function (req, res, next){
	User.findOne({email: req.body.email})
	.populate("contact")
	.exec()
	.then(function (user){	
		if(user){
			user.reset_Password = false;
			user.password = req.body.password;
			user.save(function(err, data){
				if(err){
					res.send(false);
				}
				res.send("Password Changed");
			})
		}else{
			res.send(false);
		}
		
	})
	.then(null, next);		
});

router.post('/email', function (req){
	// sendEmail("User", req.body.sendTOEmail, "Artsy Fartsy", req.body.sendFromEmail, req.body.subject, req.body.message);
	sendEmail(req.body.sendTOEmail, "tremaynerod@gmail.com", "Artsy Fartsy", req.body.sendFromEmail, req.body.subject, req.body.message);
});

router.put('/', function (req, res, next){
	User.update({}, req.body, {multi: true})
	.exec()
	.then(function (){		
		res.send("All Users Updated");
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next){
	if(req.body.updateType === 'user'){
		if(req.body.info.contact){
			req.body.info.contact = req.body.info.contact._id;
		}
		User.findOneAndUpdate({_id: req.params.id}, req.body.info).exec();
	}else{
		User.findOne({_id: req.params.id})
		.populate('Contact')
		.exec()
		.then(function (contactId){
			Contact.findOneAndUpdate({_id: contactId}, req.body.info).exec();
		})
		.then(null, next);
	}
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

router.delete('/:id', function (req, res, next){
	User.remove({_id: req.params.id})
	.exec()
	.then(function (){
		res.send({message: 'review successfully removed'});
	})
	.then(null, next);
})