var fs = require('fs');

var readFile = function(fileName) {  
  return new Promise((resolve, reject) =>{
    fs.readFile(fileName, function(err, data) {
      if(err) return reject(err);
      resolve(data.toString());
    })
  });
}

var fileNames = ["1.txt", "2.txt", "3.txt"]
promises = fileNames.map(readFile);

Promise.all(promises)  
  .then(function(results) {
    var data = 0;
    results.forEach(function(item) {
      data += parseInt(item);
    });
    console.log("Result was: ", data);
  })
  .catch(function(err) {
    console.log("Failed:", err);
  });