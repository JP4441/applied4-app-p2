// API's for User Module

// Include model
// const User = require('../models/User');

const moment = require('moment');
const User = require('../models/User');
const Company = require('../models/Company');

// HTTP GET - Author By ID
exports.user_show_get = (req, res) => {
  console.log(req.query.id);

  User.findById(req.query.id)
    .then((user) => {
      console.log(user);
      res.render('user/detail', { user, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP GET - Load User Edit Form
exports.user_edit_get = (req, res) => {
  User.findById(req.query.id)
    .then((user) => {
      res.render('user/edit', { user });
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP PUT - User Update
exports.user_update_put = (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/company/index');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.user_stats_get = (req, res) => {
  res.render('user/stats');
};

exports.user_options_get = (req, res) => {
  res.render('user/options');
};

// HTTP DELETE - USER
exports.user_delete_get = (req, res) => {
  Company.deleteMany({ user: req.user.id })
    .then(() => {
      User.findByIdAndDelete(req.user._id).then(() => {
        res.redirect('/auth/signup');
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// // HTTP DELETE - USER
// exports.user_delete_delete = (req, res) => {
//   Company.deleteMany({ user: req.user.id })
//     .then(() => {
//       User.findByIdAndDelete(req.user._id).then(() => {
//         res.redirect('/auth/signup');
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
