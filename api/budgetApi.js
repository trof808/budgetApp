var mongoose = require('mongoose');
var LeaveDate = require('../models/budgetData');

exports.formatDate = function(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    monthIndex = monthIndex.toString();
    if (monthIndex.length < 2) {
        monthIndex = '0' + monthIndex;
    }
    var nowDate = year + '-' + monthIndex + '-' + day;
    return nowDate;
};
