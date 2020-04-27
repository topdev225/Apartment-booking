require('dotenv').config();
var UserModel = require('../models').User;
var UserService = require('../services/userService');

var UserController = {
    getAllUsers: (req, res) => {
        UserService.validateUserRole(req.headers.email, callback => {
            if (callback) {
                UserModel.findAll()
                    .then(users => {
                        if (users.length > 0) {
                            var sendData = [];
                            users.forEach(user => {
                                sendData.push({
                                    id: user.get().id,
                                    userName: user.get().userName,
                                    email: user.get().email,
                                    role: user.get().role,
                                    createdAt: user.get().createdAt,
                                    updatedAt: user.get().createdAt,
                                })
                            });

                            return res.status(200).json({
                                success: true,
                                data: sendData,
                            });
                        } else {
                            return res.status(410).json({
                                success: false,
                                message: 'Not matched result',
                            });
                        }
                    })
                    .catch(error => {
                        console.log('Get all user error: ', error);
                        return res.status(500).json({
                            success: false,
                            message: 'Server connection error.',
                        });
                    });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'This user has not permission.'
                });
            }
        })
    },
    getUserByID: (req, res) => {
        UserService.validateUserRole(req.headers.email, callback => {
            if (callback) {
                UserModel.findOne({
                    where: {
                        id: req.params.userID,
                    }
                }).then(user => {
                    var sendData = {
                        id: user.get().id,
                        userName: user.get().userName,
                        email: user.get().email,
                        role: user.get().role,
                        createdAt: user.get().createdAt,
                        updatedAt: user.get().updatedAt
                    }

                    return res.status(200).json({
                        success: true,
                        data: sendData,
                    });
                }).catch(error => {
                    console.log('Get user by ID error: ', error);
                    return res.status(500).json({
                        success: false,
                        message: 'Server connection error.',
                    });
                })
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'This user has not permission.'
                });
            }
        });
    },
    createUser: async (req, res) => {
        await UserService.validateUserRole(req.headers.email, async callback => {
            if (callback) {
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
                            role: req.body.role,
                        }

                        UserModel.create(newUser)
                            .then(user => {
                                var sendData = {
                                    userName: user.get().userName,
                                    email: user.get().email,
                                    role: user.get().role,
                                    createdAt: user.get().createdAt,
                                    updatedAt: user.get().updatedAt
                                }
                                return res.status(200).json({
                                    success: true,
                                    data: sendData,
                                });
                            })
                            .catch(error => {
                                console.log('Create new User error: ', error);
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
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'This user has not permission.'
                });
            }
        });
    },
    updateUserByID: async (req, res) => {
        UserService.validateUserRole(req.headers.email, callback => {
            if (callback) {
                var updateData = {
                    userName: req.body.userName,
                    email: req.body.email,
                    updatedAt: new Date()
                }

                UserModel.update(updateData, {
                        where: {
                            id: req.params.userID,
                        }
                    }).then(() => {
                        return res.status(200).json({
                            success: true,
                            message: 'Updated user successfully.',
                        });
                    })
                    .catch(error => {
                        console.log('Update user detail error: ', error);
                        return res.status(500).json({
                            success: false,
                            message: 'Server connection error.',
                        });
                    });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'This user has not permission.'
                });
            }
        });
    },
    deleteUserByID: async (req, res) => {
        await UserService.validateUserRole(req.headers.email, async callback => {
            if (callback) {
                await UserModel.destroy({
                    where: {
                        id: req.params.userID
                    }
                }).then(() => {
                    return res.status(204).json({
                        success: true,
                        message: 'Updated user successfully.',
                    });
                }).catch(error => {
                    console.log('Delete user error :', error),
                        res.status(500).json({
                            success: false,
                            message: 'Server connection error.',
                        });
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: 'This user has not permission.'
                });
            }
        });
    }
};

module.exports = UserController;