var express = require('express');
var router = express.Router();
var UserController = require('../controllers/user');

router.get('/', UserController.getAllUsers);
router.get('/:userID', UserController.getUserByID);
router.post('/', UserController.createUser);
router.put('/:userID', UserController.updateUserByID);
router.delete('/:userID', UserController.deleteUserByID)

module.exports = router;
