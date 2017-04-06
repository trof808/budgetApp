var LeaveDate = require('../models/budgetData');
var User = require('../models/user');
var budgetApi = require('../api/budgetApi');
var userApi = require('../api/userApi');

module.exports = function(app, dbConnect) {
    app.get('/', function(req, res) {

        var options = {
            currentDate: budgetApi.formatDate(new Date()),
            data: {}
        };

        var today = options.currentDate.split('-')[0] + '-' + options.currentDate.split('-')[1];
        LeaveDate.find({date: new RegExp(today)}, null, {sort: {date: 1}}, function (err, data) {
            if(err) throw err;
            if(data !== {}) {
                data.forEach(function(item) {
                    item.date = budgetApi.formatDateUi(item.date);
                });
                options.data = data;
            }
            res.render('index', {options: options});
        });
    });

    app.get('/:editId', function(req, res) {
        var editId = req.params.editId;
        LeaveDate.find({_id: editId}, function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });

    app.post('/', function(req, res) {
        var newLeave = LeaveDate(req.body).save(function(err, data) {
            if(err) console.log('Ошибка при сохранении' + err);
            res.json(data);
        });
    });

    app.delete('/:itemId', function(req, res) {
        LeaveDate.find({_id: req.params.itemId}).remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });

    app.put('/:updateId', function(req, res) {
        LeaveDate.update({_id: req.params.updateId}, req.body, function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
};
