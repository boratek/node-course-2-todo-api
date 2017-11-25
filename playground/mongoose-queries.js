const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

var id = '5a19391f23b9be950d639317';

// returns [] with object loaded by id
Todo.find({
  _id: id // mongoose will convert string to ObjectID himself
}).then((todos) => {
  console.log('Todos by find()', todos);
});

// returns one {}
Todo.findOne({
  _id: id // mongoose will convert string to ObjectID himself
}).then((todo) => {
  console.log('Todo by findOne()', todo);
});

// returns one {}
Todo.findById(id).then((todo) => {
  console.log('Todo by findById()', todo);
});
