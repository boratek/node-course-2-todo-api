require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);

  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.send(400).send(e);
  });
});

//GET /todos/12234234
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //valid  id user isValid
    // invalid - respond with 404
  if (!ObjectId.isValid(id)) {
    console.log('Id is not valid');

    return res.sendStatus(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
    // success
      // if not todo - return info - send back 404 and empty body
    if (!todo) {
      console.log('Id not found');
      return res.sendStatus(404).send();
    }

    // if todo - send it back
    console.log('Todo by findById()', todo);
    res.send({todo});
  }).catch((e) => {
    // error
    // 400 - send empty body back
    res.sendStatus(400).send();
    console.log(e);
  });
});

//DELETE /todos/12234234
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  //valid  id user isValid
    // invalid - respond with 404
  if (!ObjectId.isValid(id)) {
    console.log('Id is not valid');

    return res.sendStatus(404).send();
  }

  // findById
  Todo.findByIdAndRemove(id).then((todo) => {
    // success
      // if not todo - return info - send back 404 and empty body
    if (!todo) {
      console.log('Id not found');
      return res.sendStatus(404).send();
    }

    // if todo - send it back
    console.log('Todo removed by findByIdAndRemove()', todo);
    res.send({todo});
  }).catch((e) => {
    // error
    // 400 - send empty body back
    res.sendStatus(400).send();
    console.log(e);
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;

  //valid  id user isValid
    // invalid - respond with 404
  if (!ObjectId.isValid(id)) {
    console.log('Id is not valid');

    return res.sendStatus(404).send();
  }

  var body = _.pick(req.body, ['text', 'completed']);

  if (_.isBoolean(body.completed) && body.completed) {
    // completed is true
    body.completedAt = new Date().getTime();
  } else {
    // completed is not true
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send()
  });
});

// ---------------------- USERS ---------------------------------
// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
console.log(body);
  var user = new User(body);

  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send({users})
  }, (e) => {
    res.send(400).send(e);
  });
});

app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
});

module.exports = {app};
