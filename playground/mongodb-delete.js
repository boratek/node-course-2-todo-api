const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findAndDeleteOne
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

// challenge
// 1. deleteMany from Users
// 2. findOneAndDelete by _id

// 1. deleteMany
// db.collection('Users').deleteMany({name: 'Bart'}).then((result) => {
//   console.log(result);
// });

// 2. findOneAndDelete
db.collection('Users').findOneAndDelete({_id: new ObjectID('5a0b5c66e72aa1dc78436edb')}).then((result) => {
  console.log(result);
});


  // db.close();
});
