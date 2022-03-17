// Dependencies
const { accepts } = require('express/lib/request');
const mongoose = require('mongoose');

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: [3, 'Company name must be longer than 3 characters'],
      maxlength: [99, 'Too Long'],
    },
    personOfInterest: {
      type: String,
    },
    appliedWhen: {
      type: Date, ///check this with mongoose flights
    },
    rating: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    location: {
      type: String,
    },
    appliedHow: {
      type: String,
    },
    response: {
      type: String,
    },
    noteSent: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true, // means createdAt and updatedAt
  }
);

// Create Model with the name Company
const Company = mongoose.model('Company', companySchema);

module.exports = Company;
