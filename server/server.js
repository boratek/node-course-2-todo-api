var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://localhost:27017/Users');

//defining todo model
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });
//
// //create new instance
// var newTodo = new Todo({
//   text: 'Finish the challenge'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo: ', e);
// });

// create new user model
// properties: email - required, trimed, type string, min length: 1

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

var newUser = new User({
  email: 'boratek234234@gmail.com'
});

newUser.save().then((doc) => {
  console.log('Saved user', doc);
}, (e) => {
    console.log('Unable to save user: ', e);
});
