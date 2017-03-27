var mongoose = require('mongoose');
var crypto = require('crypto');
var User = require('../models/user');

exports.createUser = function(userData) {
    var user = {
        name: userData.name,
        email: userData.email,
        password: hash(userData.password)
    };

    return new User(user).save();
};

exports.getUser = function(id) {
    return User.findOne(id);
};

exports.checkUser = function(userData) {
    return User
        .findOne({email: userData.email})
        .then(function(doc) {
            if(doc.password == hash(userData.password)) {
                console.log('User password is OK');
                Promise.resolve(doc);
            } else {
                Promise.reject(doc);
            }
        });
};

function hash(text) {
    return crypto.createHash('sha1').update(text).digest('base64')
}
