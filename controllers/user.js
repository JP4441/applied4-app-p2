// API's for User Module

// Include model
// const User = require('../models/User');

const moment = require('moment');
const User = require('../models/User');

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
