'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;

router.use('/art', require('./subroutes/art.js'));
router.use('/category', require('./subroutes/category.js'));
router.use('/event', require('./subroutes/event.js'));
router.use('/order', require('./subroutes/order.js'));
router.use('/review', require('./subroutes/review.js'));
router.use('/user', require('./subroutes/user.js'));
router.use('/register', require('./subroutes/register.js'));
router.use('/contact', require('./subroutes/contact.js'));
router.use('/promo', require('./subroutes/promo.js'));

