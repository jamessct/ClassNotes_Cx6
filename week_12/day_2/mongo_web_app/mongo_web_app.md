# Mongo Web App

## Learning Objectives
- Understand how to use Mongo in our JS

## Duration
2 hours

# Intro

jarrodbennie: "I really don’t think it will be bad" 
jarrodbennie: "It seems pretty do-able"
jarrodbennie: "There will be a lot of typos"

We're going to plug in Mongo to our film review site. Instead of being hard coded data, we're going to read it from a database.

# Seed Data

First we need to make our mongo database.

```js
mongod //make sure this is running
mongo < seeds.js
```

Next we need to install the MongoClient package

```js
npm install mongodb --save
```

Great, we're ready to go. Ideally we'd like to get to the stage where we have replaced all the hardcoded films in our Films.js with an api call to our shiny new mongo database.

## Database connection

The first thing we're going to do is try and get our collection back from the database.

```js
//terminal
mkdir db //same level as client
touch db/filmQuery.js
```

This is where all of our database logic is going to go. First we need to import the MongoClient library.

```js
//filmQuery.js
var MongoClient = require('mongodb').MongoClient;
```

This is a _database driver_. Basically it lets us talk in JS to mongo in our web app which is rather nice. Next we need to declare the constructor function for our class.

```js
//filmQuery.js
var MongoClient = require('mongodb').MongoClient;

var FilmQuery = function(){ //NEW
  
}

module.exports = FilmQuery; //NEW
```

Mongo runs on a port on our machine which we can communicate with using a special url. You'll notice it uses mongodb:// instead of http:// since it's a mongo specific url - it can't be seen by your browser. Notice that it's the port that Mongo runs on, followed by the name of the collection we want to access.

```js
//filmQuery.js
var MongoClient = require('mongodb').MongoClient;

var FilmQuery = function(){
  this.url = 'mongodb://localhost:27017/ratings_site'; //NEW
}

module.exports = FilmQuery;
```

Now we need to flesh out the db connection itself. MongoClient comes with a connect method, which takes in a special mongo url and a callback to run when the connection has been established. 
```js
//filmQuery.js
var MongoClient = require('mongodb').MongoClient;

var FilmQuery = function(){
  this.url = 'mongodb://localhost:27017/ratings_site';
}

FilmQuery.prototype = {
  all: function(){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        console.log("connected!");
      }
    });
  }
}

module.exports = FilmQuery;
```

Before we go any further, let's make sure this works.

```js
//server.js
var FilmQuery = require('./db/filmQuery'); //NEW

//SAME AS BEFORE

app.listen(3000, function () {
  new FilmApi(app);
  var query = new FilmQuery(); //NEW
  query.all() //NEW
  console.log('App running on port '+this.address().port);
});
```

Notice that the callback provides a db object that we can now use to talk to the database.

```js
//filmQuery.js
FilmQuery.prototype = {
  all: function(){
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection('films'); //NEW
    });
  }
}
```

This will return the specified collection from the database which we can then query. To find all of our films, we need to use the find() method. This will return some Mongo documents, which we then want to convert to an array.

```js
//filmQuery.js
FilmQuery.prototype = {
  all: function(){
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection('films');
      collection.find().toArray();
    });
  }
}
```

The bad news is this is quite time consuming, so we are going to need to use the callback for when the array conversion has completed.

```js
//filmQuery.js
FilmQuery.prototype = {
  all: function(){
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection('films');
      collection.find().toArray(function(err, docs) {
        
      });
    });
  }
}

```

Once aaaalllll of this is good, we want to exit the function and return the data. However, we are in a callback so it's not that simple. We can't just "return" and send it back - we need to send a callback that will be invoked when everything is finished and ready t be sent back.

```js
//filmQuery.js
FilmQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection('films');
      collection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      });
    });
  }
}
```

Phew! Again, just make sure this works.

```js
//server.js
app.listen(3000, function () {
  new FilmApi(app);
  var query = new FilmQuery();
  query.all(function(data){ //UPDATED
    console.log(data);
  });
  console.log('App running on port '+this.address().port);
});
```

# Using the Data in the API

Great, now we can get our data from the db. This is great news.

Next we want to hook this up to the api. Let's remove our code from server.js for a start.

```js
//server.js
var FilmQuery = require('./db/filmQuery'); //CUT to paste in FilmApi

app.listen(3000, function () {
  new FilmApi(app);
  var query = new FilmQuery(); //DELETED
  query.all(function(data){ //DELETED
    console.log(data);
  });
  console.log('App running on port '+this.address().port);
});

```

We're going to use this code in the filmApi.js file instead. We want the api layer to talk to the DB after all. Then the UI will talk to the API! 

[i:] Draw this on board

We only have some minor modification to make here. The api is no longer going to build up things using the models, it's simply going to serve up data from the DB.

```js
//filmApi.js
var FilmQuery = require('../db/filmQuery'); //NEW

var films = require('../client/src/models/films')(); //DELETED
var Film = require('../client/src/models/film'); //DELETED
var Review = require('../client/src/models/review'); //DELETED

var query = new FilmQuery(); //NEW

app.get('/api/films', function(req, res) {
  query.all(function(results){ //NEW
    res.json(results);
  });
});
```

When the call to the database is complete, THEN we will send the response. Near huh? Callbacks are so sweet.

# Using the data in the UI

Great, we're nearly there! How exciting. We'll need to first make some alterations to the Films function, then reflect this change in the UI function. This is going to be a little tricky so just stick with me for a bit!

Let's delete all the hardcoded data on films.js.

```js
//films.js
var Film = require('./film');
var Review = require('./review');

var Films = function(){

  var review1 = new Review({ //DELETED
    comment: "It's not even a thing. What just happened. I want my life back.",
    rating: 1,
    author: "Val"
  });

  var review2 = new Review({ //DELETED
    comment: "Pew pew pew lightsabers space cowboys whoot what's not to love",
    rating: 100,
    author: "Val"
  });

  var film1 = new Film({ //DELETED
    title: "Now You See Me",
    actors: ["Woody Harrelson", "Jesse Eisenberg"],
    genre: "Mystery"
  });

  var film2 = new Film({ //DELETED
    title: "Star Wars Episode IV: A New Hope",
    actors: ["Harrison Ford", "Alec Guiness"],
    genre: "Action"
  });

  film1.addReview(review1); //DELETED
  film2.addReview(review2); //DELETED

  return [film1, film2]; //DELETED
}

module.exports = Films;
```

After deletions:

```js
var Film = require('./film');
var Review = require('./review');

var Films = function(){}

module.exports = Films;
```

Now the fun stuff. We're going to make an api call _to our own api_! How exciting is that.

We'll need our good old friend makeRequest. Now, ideally this would live in another file but we'll just keep it in here for now.

```js
//films.js
var Film = require('./film');
var Review = require('./review');

var Films = function(){}

Films.prototype = { //NEW
  makeRequest: function(url, callback){ //NEW
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = callback;
    request.send();
  }
}
module.exports = Films;
```

Next, we'll add a method that will return all the films.

```js
//films.js
Films.prototype = { 
  //SAME AS BEFORE
  all: function(){ //NEW
    this.makeRequest("http://localhost:3000/api/films", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      console.log(results);
    });
  }
}
```

We should check this works before moving on.

Note: Our JSON data doesn't have any methods. We could theoretically just serve up the JSON to the UI, but we'd lose any access to methods on it. We often want to 'inflate' our own models from JSON data to manipulate it and add logic to them.

Let's use this to make a little method that will construct some films from the data.

```js
//films.js
Films.prototype = {
  //SAME AS BEFORE
  all: function(){
    this.makeRequest("http://localhost:3000/api/films", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);

      var films = this.populateFilms(results); //NEW
    });
  }
}
```

There is a problem ofcourse. We need to use the response object itself in the callback (this) however, we also want to use _our own object_ to call populateFilms! Nightmare! We can't use bind, because we will lose the request - our object doesn't have a responseText method.

Bad news - we'll need to stuff our own object into a variable!

```js
//films.js
all: function(){
  var self = this; //NEW
  this.makeRequest("http://localhost:3000/api/films", function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var results = JSON.parse(jsonString);

    var films = self.populateFilms(results); //NEW
  });
},
```

This is very sad, but it has to be done. This method is actually pretty easy! We'll loop over each item in the api data (which is the json representation of our films and reviews if you remember) and pass it to our Film object constructor. And it'll all just work. Wow.

```js
//films.js prototype
  //SAME AS BEFORE
  populateFilms: function(results){ //NEW
    var films = [];
    
    for(var result of results){
      var film = new Film(result);
      films.push(film);
    }
    return films;
  }
//SAME AS BEFORE
```

Amazing, we're good to go. Let's check it worked before moving on.

```js
//films.js
all: function(){
  var that = this;
  this.makeRequest("http://localhost:3000/api/films", function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var results = JSON.parse(jsonString);

    var films = that.populateFilms(results);
    console.log(films); //NEW
  });
},
```

Notice that these are now "Film" objects! And they have methods on them. We're nearly there!

We need a way to pass this all back to the UI when we are done. You guessed it, we need a callback.

```js
//films.js
all: function(callback){ //NEW
  var that = this;
  this.makeRequest("http://localhost:3000/api/films", function(){
    if(this.status !== 200) return;
    var jsonString = this.responseText;
    var results = JSON.parse(jsonString);

    var films = that.populateFilms(results);
    callback(films); //NEW
  });
},
```

Lastly, we need to go and use this in UI.js. We need to remember to bind this!

```js
//ui.js
films.all(function(result){
  this.render(result);
}.bind(this));
```

Whooooot! What a journey! But we now have a fullstack js app running with Mongo. Pretty neat huh?