var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var LeaveDate = require('../models/budgetData');
var User = require('../models/user');
var budgetApi = require('../api/budgetApi');
var userApi = require('../api/userApi');

mongoose.connect('mongodb://trof:585465077m@ds137230.mlab.com:37230/budgetwebapp');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
    app.get('/', function(req, res) {

        var options = {
            currentDate: budgetApi.formatDate(new Date()),
            data: {}
        };

        LeaveDate.find({}, function (err, data) {
            if(err) console.log('Ошибка при получения данных из базы ' + err);
            if(data !== {}) {
                options.data = data
            }
            res.render('index', {options: options});
        });
    });

    app.get('/:editId', function(req, res) {
        var editId = req.params.editId;
        LeaveDate.findOne({_id: editId}, function(err, data) {
            if(err) throw err;
            res.json(data);
            console.log(data);
        });
    });

    app.post('/', urlencodedParser, function(req, res) {
        new LeaveDate(req.body).save(function(err, data) {
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

    app.put('/:updateId', urlencodedParser, function(req, res) {
        LeaveDate.update({_id: req.params.updateId}, req.body, function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
};
