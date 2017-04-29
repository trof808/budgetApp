'use strict';
const budgetApi = require('../api/budgetApi');
const express = require('express');
const router = express.Router();
const pg = require('pg');
const config = require('../config');


router.get('/', (req, res, next) => {

    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: []
    };

    let today = options.currentDate.split('-')[0] + '-' + options.currentDate.split('-')[1];

    pg.connect(config.connectionString, (err, client, done) => {
      if(err) {
        done();
        next();
      } else {
        const query = client.query('SELECT * FROM data');
        query.on('row', (row) => {
          options.data.push(row);
          console.log(row);
        });
        query.on('end', () => {
          done();
          res.render('index', {options: options});
        });
      }
    });

});

router.post('/', (req, res, next) => {

    let data = req.body;

    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: []
    };

    pg.connect(config.connectionString, (err, client, done) => {
      if(err) {
        console.log(err);
        next();
      } else {
        client.query('INSERT INTO data(type, date, category, description, sum) values($1, $2, $3, $4, $5)', [data.type, data.date, data.category, data.description, data.sum]);
        const query = client.query('SELECT * FROM data ORDER BY id ASC');

        query.on('row', (row) => {
          options.data.push(row);
          console.log(row);
        });
        query.on('end', () => {
          done();
          return res.json(options.data);
        });
      }
    });

});

// router.get('/:editId', (req, res, next) => {
//     let editId = req.params.editId;
//     LeaveDate.findOne({_id: editId}, (err, data) => {
//         if(err) next();
//         res.send(data);
//         console.log(data);
//     });
// });

router.delete('/:itemId', (req, res, next) => {

    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: []
    };

    pg.connect(config.connectionString, (err, client, done) => {
      if(err) {
        done();
        next();
      } else {
        client.query('DELETE FROM data WHERE id=($1)', [req.params.itemId]);
        const query = client.query('SELECT * FROM data ORDER BY id ASC');
        query.on('row', (row) => {
          options.data.push(row);
          console.log(row);
        });
        query.on('end', () => {
          done();
          res.json(options.data);
        });
      }
    });

    // LeaveDate.find({_id: req.params.itemId}).remove((err, data) => {
    //     if(err) next();
    //     res.json(data);
    // });
});
//
// router.put('/:updateId', (req, res, next) => {
//     LeaveDate.update({_id: req.params.updateId}, req.body, (err, data) => {
//         if(err) next();
//         res.json(data);
//     });
// });


module.exports = router;
