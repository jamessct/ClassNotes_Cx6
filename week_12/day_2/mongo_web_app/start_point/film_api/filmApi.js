var FilmApi = function(app) {
  
  var films = require('../client/src/models/films')();

  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  //film index
  app.get('/api/films', function(req, res) {
    res.json(films);
  });
}

module.exports = FilmApi;
