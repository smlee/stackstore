/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        },
        {
            email: 'yae.joanne@gmail.com',
            password: 'joanne',
            contact: "5579a435aca016731d3805ed", // seed contacts first
            role: 'buyer'
        },
        {
            email: 'rod.trey@gmail.com',
            password: 'trey',
            contact: "5579a435aca016731d3805ee", // seed contacts first
            role: 'buyer'
        },
        {
            email: 'niss.james@gmail.com',
            password: 'james',
            contact: "5579a435aca016731d3805ef", // seed contacts first
            role: 'buyer'
        },
        {
            email: 'kim.sang@gmail.com',
            password: 'sang',
            contact: "5579a435aca016731d3805f0", // seed contacts first
            role: 'artist'
        },
        {
            email: 'jones.bob@gmail.com',
            password: 'bob',
            contact: "5579a435aca016731d3805f1", // seed contacts first
            role: 'buyer'
        },
        {
            email: 'smart.jane@gmail.com',
            password: 'jane',
            contact: "5579a435aca016731d3805f2", // seed contacts first
            role: 'buyer'
        },
        {
            email: 'butler.ash@gmail.com',
            password: 'butler',
            role: 'artist'
        }
    ];

    return q.invoke(User, 'create', users);

};

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});