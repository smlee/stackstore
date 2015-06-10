/**
 * Created by sangmin on 6/10/15.
 */
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');

var Category = mongoose.model('Category');

describe('Category model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function(){
        expect(Category).to.be.a('function');
    });

    describe('Category Family', function(){
        var soloCategory, strangeCategory, catWithChild;
        beforeEach('Create categories', function(done) {
           soloCategory = new Category({name: ''})
        });

        beforeEach('Create categories', function(done) {

        })

        beforeEach('Create categories', function(done) {

        })
    });
});