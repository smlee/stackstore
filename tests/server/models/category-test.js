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
                catWithParent.save(done);
            });

        });

        it('should have a total of five', function(done) {
            Category.find({}, function(err, categories) {
                if (err) done(err);
                expect(categories.length).to.be.equal(5);
            });
            done();
        });

        it('should be lonely sometimes', function(done) {
            Category.find({name: 'Abstract'}, function(err, category) {
                if (err) done(err);
                expect(category.parent).to.be.equal(undefined);
            });
            done();
        });

        describe('Parents', function() {
            it('should have a parent', function(done) {
                Category.findOne({name: 'subAbstract'}).populate('parent').exec(function(err, child) {
                    if (err) done(err);
                    expect(child.parent.name).to.be.equal('Abstract');
                });
                done();
            });

            it('should be able to save a parent that is a sub document', function(done) {
                Category.findOne({name: 'Weird'}).populate('parent').exec(function(err, child){
                    if(err) done(err);
                    expect(child.parent.name).to.be.equal('Strange')
                });
                done();
            });

            it('should be able to get children', function(done) {
                Category.findOne({name: 'Abstract'}, function(err, self) {
                    if (err) done(err);
                    self.getChildren().then(function(child) {
                        expect(child.name).to.be.equal('subAbstract');
                    })
                });
                done();
            })

        });

        describe('Siblings', function() {
            it('should be able to get siblings', function(done) {
                Category.findOne({name: 'Weird'}, function(err, me) {
                    if (err) done(err);
                    me.getSiblings.then(function(err, siblings) {
                        if(err) done(err);
                        expect(siblings.length).to.be.equal(2);
                    });
                });
                done();
            })


        });
    });
});