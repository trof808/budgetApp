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
    if(!(req.body.email === '') && !(req.body.password === '')) {
        new User({email: req.body.email, password: req.body.password}).save((err, user) => {
            if(err) next();
            // console.log(user);
            res.redirect('/user/login');
        });
    } else {
        next();
    }

});

router.get('/login', (req, res, next) => {
    req.session.reg = true;
    let options = {
        reg: req.session.reg
    };
    res.render('login', {options: options});
});

module.exports = router;
