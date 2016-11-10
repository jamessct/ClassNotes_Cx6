var CatApi = function(app){
  var cats = ["Bengal", "British Shorthair", "Siamese"]; 

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