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
        var soloCategory, strangeCategory, catWithParent;
        beforeEach('Create categories', function(done) {
            soloCategory = new Category({name: 'Abstract'});
            soloCategory.save(done);
        });

        beforeEach('Create categories', function(done) {
            var strange = new Category({name: 'Strange'})
            strangeCategory = new Category({
                parent: strange,
                name: 'Weird'
            });
            strange.save(function(st) {
                strangeCategory.save(done);
            });

        });

        beforeEach('Create categories', function(done) {
            catWithParent = new Category({
                parent: soloCategory._id,
                name: 'subAbstract'
            });
            catWithParent.save(done);
        });
        beforeEach('Create categories', function(done) {
            Category.findOne({name: 'Strange'}, function(err, category) {
                catWithParent = new Category({
                    parent: category._id,
                    name: 'Abnormal'
                });
            });
            catWithParent.save(done);
        });

        it('should have a total of five', function(done) {
            Category.find({}, function(err, categories) {
                if (err) done(err);
                console.log('############Categories############## \n', categories);
                expect(categories.length).to.be.equal(5);
            });
            done();
        });

        it('should be lonely sometimes', function(done) {
            Category.find({name: 'Abstract'}, function(err, category) {
                expect(category.parent).to.be.equal(undefined);
            });
            done();
        });

        it('should have a parent', function(done) {
            Category.findOne({name: 'subAbstract'}).populate('parent').exec(function(err, child) {
                expect(child.parent.name).to.be.equal('Abstract');
            });
            done();
        });

        xit('should be able to save a parent that is a new category', function(done) {
            Category.findOne({name: 'Weird'})
        })
    });
});