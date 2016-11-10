# RESTful Routes in Express

## Learning Objectives
- Learn how to make GET requests in express

## Duration
30 mins

# Intro

Can you remember the RESTful routes? The good news is, the patterns in express are basically the same as Sinatra. We're going to have a look at some of them just now.

# Read-only routes

Let's say we have a set of cats we want to interact with.

```js

var express = require('express');
var app = express();

var cats = ["Bengal", "British Shorthair", "Siamese"]; //NEW

app.get('/', function (req, res) {
  res.json({ data: 'sup!'});
});

app.listen(3000, function () {
  console.log('App running!');
});
```

## Index

```js
app.get('/cats', function(req, res) { //NEW
  res.json(cats);
});
```

## Cat by Id

Remember the most specific routes needs to go first, so be sure to put this above the cats route!

```js
//THIS MUST GO ABOVE CATS
app.get('/cats/:id', function(req, res){
  res.json({data: cats[req.params.id]});
})
```

# Update routes

## Bad news


Part of the idea behind express is to keep things as lightweight as possible, but this comes with some pros and cons.

One of the pros is that it keeps things fast. The less that express has to think about when a request is made, the faster it can hand back a response. Another good thing is that it makes things explicit. If you see express code you can easily see any extra things it is doing by looking at the extra code. 

However the downside to this is that some things you might think would be basic "out of the box" behaviour aren't there in express.

One of these missing features is a way to read data sent with the body of the request - like when we sent new names or details in Sinatra to update our models. We'll use a little library called BodyParser for this.

```
npm install --save body-parser
```

We need to then incude this in our server.js. It's horrible but we just need to deal with it.

```js
//top of file
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
```

Cool we now have the tools we need to deal with POST requests.

## Create a cat

Create a new cat

```js
app.post('/cats', function(req, res) {
  cats.push(req.body.cat);
  res.json({data: cats});
});
```

We can test this using Insomnia. Insomnia is a cool little REST client we can download on our machines.

https://insomnia.rest/

- POST request to localhost:3000/cats
- Body: json {"cat": "Persian"}

## Update a cat

```js
app.put('/cats/:id', function(req, res) {
  res.json({data: cats});
});
```

## Delete a cat

```js
app.delete('/cats/:id', function(req, res) {
  cats.splice(req.params.id, 1);
  res.json({data: cats});
});
```

# Refactor

Okay, so this is working but it's a little messy. Ideally we'd like to separate our server setup from our actual api (incase we have several resource routes in our app). So let's do a little refactor.

```js
touch catApi.js
//catApi.js
var CatApi = function(app){

}
module.exports = CatApi;
```
Let's go and grab all of our cats routes and paste them in here.

```js
var CatApi = function(app){
  app.get('/', function (req, res) {  //NEW
    res.json({ text: 'Sup!'});
  });

  app.get('/cats/:id', function(req, res){  //NEW
    res.json({data: cats[req.params.id]});
  });

  app.get('/cats', function(req, res) { //NEW
    res.json({data:cats});
  });

  app.put('/cats/:id', function(req, res) { //NEW
    cats[req.params.id] = req.body.cat;
    res.json({data: cats});
  });

  app.post('/cats', function(req, res) { //NEW
    console.log(req.body)
    cats.push(req.body.cat);
    res.json({data: cats});
  });

  app.delete('/cats/:id', function(req, res) { //NEW
    cats.splice(req.params.id, 1);
    res.json({data: cats});
  });
}
module.exports = CatApi;

```
Next, let's paste in our data.

```js
var CatApi = function(app){
  var cats = ["Bengal", "British Shorthair", "Siamese"]; //NEW

  app.get('/', function (req, res) {
    res.json({ text: 'Sup!'});
  });

  app.get('/cats/:id', function(req, res){
    res.json({data:cats[req.params.id]});
  });

  app.get('/cats', function(req, res) {
    res.json({data:cats});
  });

  app.put('/cats/:id', function(req, res) {
    cats[req.params.id] = req.body.cat;
    res.json({data: cats});
  });

  app.post('/cats', function(req, res) {
    console.log(req.body)
    cats.push(req.body.cat);
    res.json({data: cats});
  });

  app.delete('/cats/:id', function(req, res) {
    cats.splice(req.params.id, 1);
    res.json({data: cats});
  });
}
module.exports = CatApi;
```

Lastly, we need to new up this model and use it in our server.js

```js
//server.js
var CatApi = require('./catApi'); //NEW

app.listen(3000, function () {
  new CatApi(app); //NEW
  console.log('App running!');
});
```
