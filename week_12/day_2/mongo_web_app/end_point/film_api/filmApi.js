var FilmQuery = require('../db/filmQuery');

var FilmApi = function(app) {
  var query = new FilmQuery();
  
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

  //film index
  app.get('/api/films', function(req, res) {
    query.all(function(results){
      res.json(results);
    });
  });
}

module.exports = FilmApi;
