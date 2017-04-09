'use strict';
const LeaveDate = require('../models/budgetData');
const budgetApi = require('../api/budgetApi');
const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {

    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: {}
    };

    let today = options.currentDate.split('-')[0] + '-' + options.currentDate.split('-')[1];
    LeaveDate.find({date: new RegExp(today)}, null, {sort: {date: 1}}, (err, data) => {
        if(err) next();
        if(data !== {}) {
            data.forEach((item) => {
                item.date = budgetApi.formatDateUi(item.date);
            });
            options.data = data;
        }
        res.render('index', {options: options});
    });
});

router.get('/:editId', (req, res, next) => {
    let editId = req.params.editId;
    LeaveDate.findOne({_id: editId}, (err, data) => {
        if(err) next();
        res.send(data);
        console.log(data);
    });
});

router.post('/', (req, res, next) => {
    new LeaveDate(req.body).save((err, data) => {
        if(err) next();
        res.json(data);
    });
});

router.delete('/:itemId', (req, res, next) => {
    LeaveDate.find({_id: req.params.itemId}).remove((err, data) => {
        if(err) next();
        res.json(data);
    });
});

router.put('/:updateId', (req, res, next) => {
    LeaveDate.update({_id: req.params.updateId}, req.body, (err, data) => {
        if(err) next();
        res.json(data);
    });
});

module.exports = router;
