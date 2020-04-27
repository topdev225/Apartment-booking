require('dotenv').config();
var UserModel = require('../models').User;
var jsonwebtoken = require('jsonwebtoken');
var UserService = require('../services/userService');

var TOKEN_SECRET = process.env.TOKEN_SECRET;
var TOKEN_EXPIRES = process.env.TOKEN_EXPIRE_IN_SECOND;

var AuthController = {
    register: async (req, res) => {
        await UserService.validateUser(req.body.email, callback => {
            if (callback == "error") {
                return res.status(500).json({
                    success: false,
                    message: 'Server connection error.',
                });
            }
            if (!callback) {
                var newUser = {
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                    role: parseInt(req.body.role),
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                UserModel.create(newUser)
                    .then(user => {
                        var token = jsonwebtoken.sign({
                            email: user.email
                        }, TOKEN_SECRET, {
                            expiresIn: TOKEN_EXPIRES
                        });
                        // return the information including token as JSON
                        return res.status(201).json({
                            success: true,
                            access_token: token,
                            role: user.get().role,
                            userName: user.get().userName,
                            userID: user.get().id,
                            message: 'Successfully created account!',
                        });
                    })
                    .catch(err => {
                        console.log("create account error: ", err);
                        return res.status(500).json({
                            success: false,
                            message: 'Server connection error.',
                        });
                    });
            } else {
                return res.status(409).json({
                    success: false,
                    message: 'This email already used by another user.',
                });
            }
        });
    },
    authenticate: (req, res) => {
        UserModel.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Authentication failure, User not found'
                });
            } else {
                user.comparePassword(req.body.password, (error, isMatch) => {
                    if (isMatch && !error) {
                        var token = jsonwebtoken.sign({
                            email: user.email
                        }, TOKEN_SECRET, {
                            expiresIn: TOKEN_EXPIRES
                        });

                        return res.status(200).json({
                            success: true,
                            access_token: token,
                            role: user.get().role,
                            userID: user.get().id,
                            userName: user.get().userName,
                        });
                    } else {
                        return res.status(404).json({
                            success: false,
                            message: 'Authentication failure, User not found'
                        });
                    }
                });
            }
        }).catch(err => {
            console.log("Find user error: ", err);
            return res.status(500).json({
                success: false,
                message: 'Server connection error.',
            });
        });
    },
}

module.exports = AuthController;