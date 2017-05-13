'use strict';
const budgetApi = require('../api/budgetApi');
const express = require('express');
const router = express.Router();
const pg = require('pg');
const config = require('../config');


router.get('/data', (req, res, next) => {

    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: []
    };

    let today = options.currentDate.split('-')[0] + '-' + options.currentDate.split('-')[1];

    pg.connect(config.config, (err, client, done) => {
      if(err) {
        done();
        next();
      } else {
        const query = client.query('SELECT * FROM data ORDER BY date ASC');
        query.on('row', (row) => {
          options.data.push(row);
        });
        query.on('end', () => {
          done();
          // res.render('index', {options: options});
          res.json(options.data)
          console.log(options.data)
        });
      }
    });

});

router.post('/data', (req, res, next) => {

    let data = req.body;
    console.log(data);
    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: []
    };

    pg.connect(config.config, (err, client, done) => {
      if(err) {
        console.log('Ошибка ' + err);
        next();
      } else {
        client.query('INSERT INTO data(type, date, category, description, sum) values($1, $2, $3, $4, $5)', [data.type, data.date, data.category, data.description, data.sum]);
        const query = client.query('SELECT * FROM data ORDER BY date ASC');

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

router.get('/:editId', (req, res, next) => {
    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: [],
        selectedItem: {}
    };

    let editId = req.params.editId;

    pg.connect(config.config, (err, client, done) => {
      if(err) {
        done();
        next();
      } else {
        const query = client.query('SELECT * FROM data WHERE id=($1)', [editId]);

        query.on('row', (row) => {
          options.selectedItem = row;
          console.log(row);
        });
        query.on('end', () => {
          console.log(options.selectedItem);
          done();
          return res.json(options.selectedItem);

        });
      }
    });
});

router.delete('/:itemId', (req, res, next) => {

    let options = {
        currentDate: budgetApi.formatDate(new Date()),
        data: []
    };

    pg.connect(config.config, (err, client, done) => {
      if(err) {
        done();
        next();
      } else {
        client.query('DELETE FROM data WHERE id=($1)', [req.params.itemId]);
        const query = client.query('SELECT * FROM data ORDER BY date ASC');
        query.on('row', (row) => {
          options.data.push(row);
        });
        query.on('end', () => {
          done();
          res.json(options.data);
        });
      }
    });

});

router.put('/:updateId', (req, res, next) => {
  let options = {
    data: []
  }
  var data = req.body
  pg.connect(config.config, (err, client, done) => {
    if(err) {
      done();
      next();
    } else {
      client.query('UPDATE data SET date=($1), category=($2), description=($3), sum=($4)  WHERE id=($5)',
      [data.date, data.category, data.description, data.sum, req.params.updateId]);
      const query = client.query('SELECT * FROM data ORDER BY date ASC');
      query.on('row', (row) => {
        console.log(row);
        options.data.push(row);
      });
      query.on('end', () => {
        done();
        res.json(options.data);
      });
    }
  });

});


module.exports = router;
