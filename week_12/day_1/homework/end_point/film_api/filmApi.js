var FilmApi = function(app) {
  var films = require('../client/src/models/films')();

  var Film = require('../client/src/models/film');
  var Review = require('../client/src/models/review');

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  //film by id
  app.get('/api/films/:id', function(req, res){
    res.json(films[req.params.id]);
  });

  //film index
  app.get('/api/films', function(req, res) {
    res.json(films);
  });

  //film update
  app.put('/api/films/:id', function(req, res) {
    var film = new Film({
      title: req.body.title,
      actors: req.body.actors
    });
    films[req.params.id] = film;
    res.json({data: films});
  });

  //add new film
  app.post('/api/films', function(req, res) {
    var film = new Film({
      title: req.body.title,
      actors: req.body.actors
    });
    films.push(film);
    res.json({data: films});
  });

  //delete review
  app.delete('/api/films/:id', function(req, res) {
    films.splice(req.params.id, 1);
    res.json({data: films});
  });

  //add review
  app.post('/api/films/:id/review', function(req, res) {
    var film = films[req.params.id];
    var review1 = new Review({
      comment: "Amaze",
      rating: 10,
      author: "Val"
    });
    film.addReview(review1);
    res.json({data: films});
  });

}
module.exports = FilmApi;