var express = require('express');
var router = express.Router();
var isAuthenticated = require('../middleware/isAuthenticated');
var AuthRouter = require('./auth');
var UserRouter = require('./user');
var ApartmentRouter = require('./apartment');

router.use('/auth', AuthRouter)
router.use('/users', isAuthenticated, UserRouter);
router.use('/apartments', isAuthenticated, ApartmentRouter);

module.exports = router;