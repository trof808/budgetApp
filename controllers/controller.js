'use strict'
const LeaveDate = require('../models/budgetData');
const budgetApi = require('../api/budgetApi');

module.exports = function(app, dbConnect) {
    app.get('/', function(req, res) {
        
        let options = {
            currentDate: budgetApi.formatDate(new Date()),
            data: {}
        };

        let today = options.currentDate.split('-')[0] + '-' + options.currentDate.split('-')[1];
        LeaveDate.find({date: new RegExp(today)}, null, {sort: {date: 1}}, (err, data) => {
            if(err) throw err;
            if(data !== {}) {
                data.forEach((item) => {
                    item.date = budgetApi.formatDateUi(item.date);
                });
                options.data = data;
            }
            res.render('index', {options: options});
        });
    });

    app.get('/:editId', (req, res) => {
        let editId = req.params.editId;
        LeaveDate.findOne({_id: editId}, (err, data) => {
            if(err) console.log('Ошибка ' + err);
            res.send(data);
            console.log(data);
        });
    });

    app.post('/', (req, res) => {
        new LeaveDate(req.body).save((err, data) => {
            if(err) console.log('Ошибка при сохранении' + err);
            res.json(data);
        });
    });

    app.delete('/:itemId', (req, res) => {
        LeaveDate.find({_id: req.params.itemId}).remove((err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });

    app.put('/:updateId', (req, res) => {
        LeaveDate.update({_id: req.params.updateId}, req.body, (err, data) => {
            if(err) throw err;
            res.json(data);
        });
    });
};
