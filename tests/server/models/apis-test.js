var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var should = require("should");
var mongoose = require('mongoose');

require('../../../server/db/models/art');
require('../../../server/db/models/category');
require('../../../server/db/models/contact');
require('../../../server/db/models/event');
require('../../../server/db/models/order');
require('../../../server/db/models/review');

var Art = mongoose.model('Art');
var Event = mongoose.model('Event');

describe('Api model', function () {

	beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done); 
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('Art model', function () {
		
	    beforeEach('add fake art', function(done) {
	    	var newArt = new Art({name: 'random art'});
	    	newArt.tags = ['test', 'works'];
	    	newArt.save(done);
	    });

	    afterEach('Clear test database', function (done) {
	        clearDB(done);
	    });

	    it('should exist', function () {
	        expect(Art).to.be.a('function');
	    });

	    describe('testing art tag getter and setter', function () {	
	       	it('should be able to get after setting', function (done) {
	        	Art.find({name: 'random art'}, function(err, art){
	    			art[0].tags.should.equal('test,works');
	    			done();
	    		});
	        });
	    });
	});

	// describe('Art model', function () {
		
	//     beforeEach('add fake art', function(done) {
	//     	var newArt = new Art({name: 'random art'});//, url: 'http://www.google.com', db_price: 5});
	//     	newArt.url = 'http://www.google.com';
	//     	newArt.price = 3;
	//     	newArt.save(done);
	//     });

	//     beforeEach('add more fake art', function(done) {
	//     	var newArt = new Art({name: 'test art'});
	//     	newArt.url = 'http://www.yahoo.com';
	//     	newArt.price = 7.53;
	//     	newArt.save(done);
	//     });

	//     afterEach('Clear test database', function (done) {
	//         clearDB(done);
	//     });

	//     it('should exist', function () {
	//         expect(Art).to.be.a('function');
	//     });

	//     describe('testing art price getter and setter', function () {	
	//        	it('should be able to get after setting', function (done) {
	//         	Art.find({name: 'random art'}, function(err, art){
	//     			art[0].price.should.equal('3.00');
	//     			done();
	//     		});
	//         });

	//         it('works with decimals', function (done) {
	//         	Art.find({name: 'test art'}, function(err, art){
	//     			art[0].price.should.equal('7.53');
	//     			done();
	//     		});
	//         });
	//     });

	//     describe('testing art url getter and setter', function () {	
	//     	it('should be able to get after setting', function (done) {
	//         	Art.find({name: 'random art'}, function(err, art){
	//     			art[0].url.should.equal('http://www.google.com');
	//     			done();
	//     		});
	//         });

	//         it('should be able to get after setting', function (done) {
	//         	Art.find({name: 'test art'}, function(err, art){
	//     			art[0].url.should.equal('http://www.yahoo.com');
	//     			done();
	//     		});
	//         });
	//     });
	// });

	// describe('Event model', function () {

	//     beforeEach('add new event', function(done) {
	//     	var newEvent = new Event({
	// 			name: 'random event',
	// 			address_line_1: 'random address',
	// 			city: 'random city',
	// 			state: 'random zip',
	// 			zip: '12345'
	//     	});
	//     	newEvent.price = 9.33;
	//     	newEvent.save(done);
	//     });

	//     it('should exist', function () {
	//         expect(Event).to.be.a('function');
	//     });

	//     describe('testing event price getter and setter', function () {	
	//     	it('should be able to get after setting', function (done) {
	//         	Event.find({name: 'random event'}, function(err, the_event){
	//     			the_event[0].price.should.equal('9.33');
	//     			done();
	//     		});
	//         });
	//     });
	// });
});


