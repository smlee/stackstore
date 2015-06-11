/**
 * Created by Joanne on 6/10/15.
 */
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/contact');

var Contact = mongoose.model('Contact');

describe ('Contact model', function(){
	beforeEach('establish DB connection', function(done){
		if(mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function(){
        expect(Contact).to.be.a('function');
    });

    describe('Contact Test', function(){
    	var newContact;
    	beforeEach(function(done){
    		newContact = new Contact({
    			contact_type: 'billing',
    			first_name: "Joanne",
    			last_name: "Yae",
    			phone_number: "1234566789",
    			address_line_1: "66 N. Conger Ave.",
    			city: "Congers",
    			state: "NY",
    			zip: "10920"
    		});
    		newContact.save(done)
    	});
    	beforeEach(function(done){
    		newContact = new Contact({
    			contact_type: 'shipping',
    			first_name: "Crystal",
    			last_name: "Jones",
    			phone_number: "1234566789",
    			address_line_1: "66 N. Conger Ave.",
    			city: "Congers",
    			state: "NY",
    			zip: "10920"
    		});
    		newContact.save(done)
    	});
    	it('should be in the database after save', function(done){
    		Contact.findOne({first_name: "Joanne"}, function(err, contact){
    			if(err) done(err);
    			expect(contact.first_name).to.be.equal('Joanne');
    		});
    		done();
    	});
    	it('should return an array of documents with a length of 2', function(done){
    		Contact.find({}, function(err, contacts){
    			if(err) done(err);
    			expect(contact.length).to.be.equal(2);
    		});
    		done();
    	});
    })
});