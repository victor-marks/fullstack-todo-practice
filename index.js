let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let bodyParser = require('body-parser');

let todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('hi there from root route');
});

app.use('/api/todos', todoRoutes);

app.listen(port, function() {
  console.log('app is running on port: ', port);
});
