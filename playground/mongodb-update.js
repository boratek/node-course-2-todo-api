const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

// simple update
  // db.collection('Todos').findOneAndUpdate(
  //   {
  //     _id: new ObjectID('5a0b5a4ee72aa1dc78436e50')
  //   }, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   }
  //   ).then((result) => {
  //     console.log(result);
  //   });

// update with incrementation
  db.collection('Users').findOneAndUpdate(
    {
      _id: new ObjectID('5a0debd1c8f340c717706dd8')
    }, {
      $set: {
        name: 'Zbigniew',
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }
    ).then((result) => {
      console.log(result);
    });

  // db.close();
});
