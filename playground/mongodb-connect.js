const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne(
  //   {
  //     text: 'Sth to do',
  //     completed: false
  //   }, (err, result) => {
  //     if (err) {
  //       return console.log('Unable to insert todo', err);
  //     }
  //
  //     console.log(JSON.stringify(result.ops, undefined, 2));
  //   });

  // Insert new doc into the Users collection
  // name, age, location

  db.collection('Users').insertOne(
    {
      name: 'Bart',
      age: 30,
      location: 'NH'
    }, (err, result) => {
      if (err) {
        return console.log('Unable to insert user', err);
      }

      console.log(JSON.stringify(result.ops, undefined, 2));
    });

  db.close();
});
