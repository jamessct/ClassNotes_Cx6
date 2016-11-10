var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.json({ text: 'Sup!'});
});

app.listen(3000, function () {
  console.log('App running on port '+this.address().port);
});