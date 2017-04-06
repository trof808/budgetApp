var mongoose = require('mongoose');
var LeaveDate = require('../models/budgetData');

exports.formatDate = function(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    day = day.toString();
    monthIndex = monthIndex.toString();
    if (monthIndex.length < 2) {
        monthIndex = '0' + monthIndex;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    var nowDate = year + '-' + monthIndex + '-' + day;
    return nowDate;
};
