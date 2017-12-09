const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// remove all
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove() - remove and return removed item, but requires query object
Todo.findByIdAndRemove({'_id': '5a2c48cec8cedb415b037a31'}).then((todo) => {
  console.log(todo);
});

// Todo.findByIdAndRemove() - remove and return what has been removed
Todo.findByIdAndRemove('5a2c48cec8cedb415b037a31').then((todo) => {
  console.log(todo);
});
