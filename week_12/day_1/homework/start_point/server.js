var express = require('express');
var app = express();
var path = require('path')
var films = require('./client/src/models/films')();

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));

app.listen(3000, function () {
  console.log('App running on port '+this.address().port);
});
