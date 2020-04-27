var UserModel = require('../models').User;

var UserService = {}
UserService.validateUser = validateUserByEmail;
UserService.validateUserRole = validateUserRole

function validateUserByEmail(email, callback) {
    UserModel.findOne({
        where: {
            email: email,
        }
    }).then(user => {
        if (user) {
            callback(true);
        } else {
            callback(false);
        }
    }).catch(error => {
        console.log('www', email)

        console.log('Find user by email error on user service: ', error);
        callback('error');
    });
}

function validateUserRole(email, callback) {
    UserModel.findOne({
        where: {
            email: email,
        }
    }).then(user => {
        if (user.get().role == 0) {
            callback(true)
        } else {
            callback(false)
        }
    }).catch(error => {
        console.log('Validate user role error on user service: ', error);
        callback('error');
    });
}

module.exports = UserService;