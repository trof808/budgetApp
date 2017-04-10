'use strict';
const express = require('express');
const router = express.Router();
const UserApi = require('../api/userApi');
const User = require('../models/User');

router.get('/register', (req, res, next) => {
    req.session.reg = true;
    let options = {
        reg: req.session.reg
    };
    res.render('register', {options: options});
});

router.post('/register', (req, res, next) => {
    User.create({email: req.body.email, password: req.body.password}).then((user) => {
        res.send(user);
    }).catch(next());
});

module.exports = router;
