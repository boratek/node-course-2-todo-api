const mongoose = require('mongoose');
const validator = require('validator');

var userObj = {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
};

var UserSchema = new mongoose.Schema(userObj);

// {
//   email: 'some@email.com',
//   password: '3q4tsergsdfgdf',
//   tokens: [{
//     access: 'auth',
//     token: 'gq34grsergdfx'
//   }]
// }

// define user model
var User = mongoose.model('User', UserSchema);

module.exports = {User};
