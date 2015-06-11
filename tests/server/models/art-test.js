/**
 * Created by sangmin on 6/10/15.
 */
var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');

var Art = mongoose.model('Art');

describe('Art model', function(){
    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function(){
        expect(Art).to.be.a('function');
    });

    describe('Model Test', function() {
        var someArt;
        beforeEach('', function (done) {
            someArt = new Art({
                name: 'Art of farting',
                artist_name: 'Fart Master'
            });
            someArt.save(done);
        });
        it('should be able to save', function(done) {
            Art.findOne({name: 'Art of farting'}, function(err, art) {
                expect(art.artist_name).to.be.equal('Fart Master');
            });
            done();
        })
    });
});