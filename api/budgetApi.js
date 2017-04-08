'use strict'

exports.formatDate = (date) => {
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    monthIndex = monthIndex.toString();
    day = day.toString();
    if (monthIndex.length < 2) {
        monthIndex = '0' + monthIndex;
    }
    if(day.length < 2) {
        day = '0' + day;
    }
    let nowDate = year + '-' + monthIndex + '-' + day;
    return nowDate;
};

exports.formatDateUi = (date) => {
    let dateArr = date.split('-');
    let newDate = dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0];
    return newDate;
};
