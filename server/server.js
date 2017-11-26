var express = require('express');
var bodyParser = require('body-parser');

const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

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

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
