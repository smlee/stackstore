var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/art');
require('../../../server/db/models/category');
require('../../../server/db/models/contact');
require('../../../server/db/models/event');
require('../../../server/db/models/order');
require('../../../server/db/models/review');

var Art = mongoose.model('Art');

describe('Art model', function () {
	var newArt;
	beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);

        
    });

    beforeEach('make fake art', function(done) {
    	newArt = new Art({name: 'random art', url: 'http://www.google.com', price: 5});
    	newArt.save(done);
    })

    afterEach('Clear test database', function (done) {

    	

        clearDB(done);
    });

    it('should exist', function () {
        expect(Art).to.be.a('function');
    });

    describe('testing art price getter and setter', function () {
    	it('getPrice should exist', function () {
    		Art.find({}, function(err, res){
    			console.log(res);
    		});
            expect(newArt.price.get).to.be.a('function');
        });

        it(' setPrice should exist', function () {
            expect(Art.price.set).to.be.a('function');
        });

        it('should be able to get after setting', function () {
        	Art.find({}, function(err, res){
        		console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    			//console.log(res.price);
    			console.log(newArt.price);
    			expect(newArt.price.to.be.equal.to(500));
    		});
        });
    });
});