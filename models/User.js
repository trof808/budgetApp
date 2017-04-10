const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        unique: true,
        required: [true, 'field username is required']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'field password is required']
    }
});

module.exports = mongoose.model('User', UserScheme);
