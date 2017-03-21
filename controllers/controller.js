var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect('mongodb://trof:585465077m@ds137230.mlab.com:37230/budgetwebapp');

var pbLeave = new mongoose.Schema({
    type: String,
    date: String,
    category: String,
    description: String,
    sum: Number
});

var LeaveDate = mongoose.model('LeaveDate', pbLeave);

function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth() + 1;
    var year = date.getFullYear();
    monthIndex = monthIndex.toString();
    if (monthIndex.length < 2) {
        monthIndex = '0' + monthIndex;
    }
    var nowDate = year + '-' + monthIndex + '-' + day;
    return nowDate;
}

var currentDate = formatDate(new Date());

module.exports = function(app) {
    app.get('/', function(req, res) {
        var options = {
            currenDate: currentDate,
            data: {}
        }

        LeaveDate.find({}, function (err, data) {
            if(err) throw err;
            if(data !== {}) {
                options.data = data
            }
            res.render('index', {options: options});
        })

    });

    app.post('/', urlencodedParser, function(req, res) {
        var newLeave = LeaveDate(req.body).save(function(err, data) {
            if(err) console.log('Ошибка при сохранении' + err);
            res.json(data);
        });
    });
}
