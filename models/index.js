let mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://vm-fullstack-todo.herokuapp.com/todo-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
