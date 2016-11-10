var fs = require('fs');

var readFile = function(fileName,callback){
  fs.readFile(fileName, function(err, data) {
    if(err) return err;
    callback(data.toString());
  });
}

readFile('1.txt',function(data){
  var result = data;
  readFile('2.txt', function(data){
    result += data;
    readFile('3.txt', function(data){
      result += data;
      readFile('4.txt', function(data){
        result += data;
        readFile('5.txt', function(data){
          result += data;
          readFile('6.txt', function(data){
            result += data;
            console.log(result);
          });
        });
      });
    });
  })
})