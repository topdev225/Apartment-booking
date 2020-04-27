var AuthController = require('../controllers/auth');
var express = require('express');
var router = express.Router();

router.post('/register', AuthController.register);
router.post('/authenticate', AuthController.authenticate);

module.exports = router;