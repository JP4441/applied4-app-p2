const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: [3, 'First name must be longer than 3 characters'],
      maxlength: [99, 'Too Long'],
    },
    emailAddress: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Your password should be at least 6 characters'],
    },
    personalStatement: {
      type: String,
      maxlength: [4000, 'Too long'],
    },
    mySkills: {
      type: String,
      maxlength: [4000, 'Too long'],
    },
    elevatorPitch: {
      type: String,
      maxlength: [350, 'Too long'],
    },
    brandStatement: {
      type: String,
      maxlength: [400, 'Too long'],
    },
    whatINeed: {
      type: String,
      maxlength: [4000, 'Too long'],
    },
    questionsToASk: {
      type: String,
      maxlength: [4000, 'Too long'],
    },
    company: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// verifyPassword
userSchema.methods.verifyPassword = function (password) {
  console.log(password);
  console.log(this.password);
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
