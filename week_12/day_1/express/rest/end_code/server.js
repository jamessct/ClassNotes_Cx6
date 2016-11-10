var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var CatApi = require('./catApi');

app.listen(3000, function () {
  new CatApi(app);
  console.log('App running!');
});