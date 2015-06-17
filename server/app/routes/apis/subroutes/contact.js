var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

var Contact = mongoose.model('Contact');
var User = mongoose.model('User');

router.get('/:id', function (req, res, next) {
    User.findOne({_id: req.params.id}, 'contact').populate('contact').exec()
        .then(function(contacts){
            res.json(contacts)
        }).then(null, next);
});

router.post('/', function (req, res, next){
    Contact.create(req.body.params.contact, function (err, contact){
        if(err) return next(err);
        User.findOne({_id: req.body.params._id}, function(err, user){
            if(err) return next(err);
            user.contact.push(contact._id);
            user.save(function(err, data){
                if(err) return next(err);
                res.send("contact successfully added to user")
            });
        });
    });
});