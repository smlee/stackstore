'use strict';
var router = require('express').Router();
module.exports = router;


//var apis = require('./apis');

router.use('/', require('./apis'));
//router.use('/tutorial', require('./tutorial'));
router.use('/members', require('./members'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});