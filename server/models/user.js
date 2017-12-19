const mongoose = require('mongoose');
const validator = require('validator');

// {
//   email: 'some@email.com',
//   password: '3q4tsergsdfgdf',
//   tokens: [{
//     access: 'auth',
//     token: 'gq34grsergdfx'
//   }]
// }

// define user model
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  }
});

module.exports = {User};
