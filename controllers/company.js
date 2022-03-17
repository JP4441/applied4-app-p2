// API's for Company Module

// Include model
const Company = require('../models/Company');
const User = require('../models/User');

let date;

const moment = require('moment');
const momentT = require('moment-timezone');

const { use } = require('passport');

// HTTP GET - Load an Add Company Form
exports.company_create_get = (req, res) => {
  res.render('company/add');
};

// HTTP POST - Article
exports.company_create_post = (req, res) => {
  console.log(req.body);

  req.body.appliedWhen = momentT.tz(req.body.appliedWhen, 'America/Toronto');

  let company = new Company(req.body);

  // Save Article
  company
    .save()
    .then(() => {
      // Save article to authors as well
      User.findById(req.user._id).then((user) => {
        user.company.push(company);
        user.save();
      });
      res.redirect('/company/index');
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP GET - Company Index
exports.company_index_get = (req, res) => {
  // Company.find({ user: req.user._id })
  User.findById(req.user._id)
    .populate('company')
    .then((user) => {
      res.render('company/index', { companies: user.company, moment }); // moment : moment
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP GET - Company By ID
exports.company_show_get = (req, res) => {
  console.log(req.query.id);

  Company.findById(req.query.id)
    .then((company) => {
      res.render('company/detail', { company, moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP DELETE - Company
exports.company_delete_get = (req, res) => {
  console.log(req.query.id);
  Company.findByIdAndDelete(req.query.id)
    .then(() => {
      User.findById(req.user._id).then((user) => {
        user.company.remove(req.query.id);
        user.save().then(() => {
          res.redirect('/company/index');
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP GET - Load Company Edit Form
exports.company_edit_get = (req, res) => {
  Company.findById(req.query.id)
    .then((company) => {
      date = momentT(company.appliedWhen).format('yyyy-MM-DD');

      res.render('company/edit', { company, date });
    })
    .catch((err) => {
      console.log(err);
    });
};

// HTTP PUT - Company Update
exports.company_update_put = (req, res) => {
  Company.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/company/index');
    })
    .catch((err) => {
      console.log(err);
    });
};
