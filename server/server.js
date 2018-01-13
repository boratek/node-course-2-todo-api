require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate.js');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// get all todos
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.send(400).send(e);
  });
});

//GET /todos/12234234
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  //valid  id user isValid
    // invalid - respond with 404
  if (!ObjectId.isValid(id)) {
    console.log('Id is not valid');

    return res.sendStatus(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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
app.delete('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  //valid  id user isValid
    // invalid - respond with 404
  if (!ObjectId.isValid(id)) {
    console.log('Id is not valid');

    return res.sendStatus(404).send();
  }

  // findOne - by id and creator
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
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

app.patch('/todos/:id', authenticate, (req, res) => {
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

  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id},
    {$set: body},
    {new: true}
  ).then((todo) => {
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
  var user = new User(body);

  user.save().then((doc) => {
    return user.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
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

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port: ${port}`);
});

module.exports = {app};
