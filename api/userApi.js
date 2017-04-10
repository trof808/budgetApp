// 'use strict';
//
// const User = require('../models/User');
//
// module.exports.loadUser = (req, res, next) => {
//     if(req.session.user_id) {
//         User.findById(req.session.user_id, (user) => {
//             if(user) {
//                 req.currentUser = user;
//                 next();
//             } else {
//                 res.redirect('/login');
//             }
//         });
//     } else {
//         res.redirect('/login');
//     }
// };
