require('dotenv').config();
var jsonwebtoken = require('jsonwebtoken');
var UserModel = require('../models').User;
var TOKEN_SECRET = process.env.TOKEN_SECRET;

async function isAuthenticated(req, res, next) {
    var token = req.headers.authorization;
    if (token) {
        await jsonwebtoken.verify(token.toString(), TOKEN_SECRET, function (error, decoded) {
            if (error) {
                return res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            }

            UserModel.findOne({
                where: {
                    email: decoded.email
                }
            }).then(result => {
                if (result) {
                    console.log(result.get())
                    req.headers['email'] = result.get().email;
                    req.headers['role'] = result.get().role;
                    // req.auth.email = decoded.email;
                    next();
                } else {
                    return res.status(403).json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                }
            }).catch(error => {
                return res.status(403).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            })

        });
    } else {
        // if there is no token
        // return an error
        res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = isAuthenticated;