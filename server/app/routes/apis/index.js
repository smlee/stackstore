'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

// router.use('/user', function (req, res , next) {
// 	console.log("asfasdaspdapsod");
// 	next();
//     //res.send();
// });

router.use('/art', require('./subroutes/art.js'));
router.use('/category', require('./subroutes/category.js'));
router.use('/event', require('./subroutes/event.js'));
router.use('/order', require('./subroutes/order.js'));
router.use('/review', require('./subroutes/review.js'));
router.use('/user', require('./subroutes/user.js'));



// var ensureAdmin = function (req, res, next) {
//     if (req.isAdmin()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };

