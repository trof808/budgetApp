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
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'field password is required']
    }
});

module.exports = mongoose.model('User', UserScheme);
