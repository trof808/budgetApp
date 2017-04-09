const mongoose = require('mongoose');

const LeaveDate = new mongoose.Schema({
    type: String,
    date: String,
    category: String,
    description: String,
    sum: Number
});

module.exports = mongoose.model('LeaveDate', LeaveDate);
