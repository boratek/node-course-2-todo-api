const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5a19391f23b9be950d639317';
var userId = '5a11e95f83ad3c323aa1dcf1';

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// returns [] with object loaded by id
// Todo.find({
//   _id: id // mongoose will convert string to ObjectID himself
// }).then((todos) => {
//   console.log('Todos by find()', todos);
// });
//
// // returns one {}
// Todo.findOne({
//   _id: id // mongoose will convert string to ObjectID himself
// }).then((todo) => {
//   console.log('Todo by findOne()', todo);
// });

// returns one {}
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//
//   console.log('Todo by findById()', todo);
// }).catch((e) => console.log(e));

// returns one user {}
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('user id not found');
  }

  console.log('User by findById()', user);
}).catch((e) => console.log(e));
