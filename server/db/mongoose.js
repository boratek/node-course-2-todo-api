var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://todo:todo@ds129156.mlab.com:29156/todo');

module.exports = {mongoose};
